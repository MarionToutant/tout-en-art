import { useCallback, useLayoutEffect, useRef } from 'react';
import Matter from 'matter-js';
import type { FloatingFieldItem } from '../types/floatingField';

interface IUseFloatingFieldOptions {
  readonly items: readonly FloatingFieldItem[];
  readonly isMotionReduced: boolean;
  readonly onInteractionChange?: (itemId: string | null) => void;
}

interface FloatingBodyState {
  readonly body: Matter.Body;
  readonly element: HTMLDivElement;
  width: number;
  height: number;
  isInWorld: boolean;
  isLaunched: boolean;
}

interface PointerSample {
  readonly x: number;
  readonly y: number;
  readonly time: number;
}

interface Size {
  readonly width: number;
  readonly height: number;
}

interface ProtectedBounds {
  readonly left: number;
  readonly right: number;
  readonly top: number;
  readonly bottom: number;
}

const wallThickness = 64;
const fieldMargin = 10;
const titleZonePadding = 3;
const physicsStep = 1000 / 60;
const launchSampleWindow = 100;
const maximumPointerSamples = 6;
const minimumLaunchSpeed = 1.1;
const maximumLaunchSpeed = 12;
const launchFrictionAir = 0.005;
const returnZonePadding = 12;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getSize(element: HTMLElement): Size {
  return {
    width: element.offsetWidth || element.getBoundingClientRect().width,
    height: element.offsetHeight || element.getBoundingClientRect().height,
  };
}

export default function useFloatingField({ items, isMotionReduced, onInteractionChange }: IUseFloatingFieldOptions) {
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const itemElements = useRef(new Map<string, HTMLDivElement>());
  const drawBodiesRef = useRef<(() => void) | null>(null);
  const currentItems = useRef(items);
  const currentItemsById = useRef(new Map(items.map((item) => [item.id, item])));
  const currentInteractionChange = useRef(onInteractionChange);
  currentItems.current = items;
  currentItemsById.current = new Map(items.map((item) => [item.id, item]));
  currentInteractionChange.current = onInteractionChange;
  const itemSignature = items.map((item) => `${item.id}:${item.kind}:${item.anchor ?? ''}`).join('|');
  const itemSizeSignature = items.map((item) => `${item.id}:${item.isExpanded === true}`).join('|');

  const registerElement = useCallback((id: string, element: HTMLDivElement | null) => {
    if (element) {
      itemElements.current.set(id, element);
    } else {
      itemElements.current.delete(id);
    }
  }, []);

  useLayoutEffect(() => {
    const field = fieldRef.current;
    const definitions = currentItems.current;
    if (!field || definitions.length === 0) {
      return undefined;
    }

    const engine = Matter.Engine.create();
    engine.gravity.x = 0;
    engine.gravity.y = 0;
    engine.gravity.scale = 0;
    engine.positionIterations = 8;
    engine.velocityIterations = 6;

    const bodyStates = new Map<string, FloatingBodyState>();
    const definitionById = new Map(definitions.map((item) => [item.id, item]));
    let motionIsReduced = isMotionReduced;
    let fieldWidth = field.clientWidth;
    let fieldHeight = field.clientHeight;
    let walls: Matter.Body[] = [];
    let titleObstacle: Matter.Body | null = null;
    const titleElement = field.closest('.home-shell')?.querySelector<HTMLElement>('.top-bar__title') ?? null;
    const measureTitleBounds = (): ProtectedBounds | null => {
      if (!titleElement) {
        return null;
      }

      const titleRect = titleElement.getBoundingClientRect();
      const fieldRect = field.getBoundingClientRect();
      return {
        left: titleRect.left - fieldRect.left - titleZonePadding,
        right: titleRect.right - fieldRect.left + titleZonePadding,
        top: titleRect.top - fieldRect.top - titleZonePadding,
        bottom: titleRect.bottom - fieldRect.top + titleZonePadding,
      };
    };
    let titleBounds = measureTitleBounds();
    let animationFrame: number | null = null;
    let previousFrameTime = 0;
    let accumulatedTime = 0;
    let suppressDragClick = false;
    const pointerState = {
      isActive: false,
      pointerId: null as number | null,
      startX: 0,
      startY: 0,
      hasMoved: false,
      bodyState: null as FloatingBodyState | null,
      offsetX: 0,
      offsetY: 0,
      samples: [] as PointerSample[],
    };
    const anchoredDefinition = definitions.find((item) => item.anchor === 'left');
    const anchoredElement = anchoredDefinition ? itemElements.current.get(anchoredDefinition.id) : undefined;
    const anchoredSize = anchoredElement ? getSize(anchoredElement) : undefined;
    const anchoredCenterX = anchoredSize
      ? Math.min(anchoredSize.width / 2 + 18, fieldWidth - anchoredSize.width / 2 - fieldMargin)
      : 0;

    const syncTitleObstacle = () => {
      if (titleObstacle) {
        Matter.Composite.remove(engine.world, titleObstacle);
        titleObstacle = null;
      }

      titleBounds = measureTitleBounds();
      if (!titleBounds) {
        return;
      }

      titleObstacle = Matter.Bodies.rectangle(
        (titleBounds.left + titleBounds.right) / 2,
        (titleBounds.top + titleBounds.bottom) / 2,
        titleBounds.right - titleBounds.left,
        titleBounds.bottom - titleBounds.top,
        { isStatic: true, restitution: 1, friction: 0, frictionAir: 0 },
      );
      Matter.Composite.add(engine.world, titleObstacle);
    };

    const getConstrainedPosition = (id: string, width: number, height: number, position: Matter.Vector): Matter.Vector => {
      const minimumX = width / 2 + fieldMargin;
      const maximumX = fieldWidth - width / 2 - fieldMargin;
      const minimumY = height / 2 + fieldMargin;
      const maximumY = fieldHeight - height / 2 - fieldMargin;
      const constrainedPosition = {
        x: minimumX <= maximumX ? clamp(position.x, minimumX, maximumX) : fieldWidth / 2,
        y: minimumY <= maximumY ? clamp(position.y, minimumY, maximumY) : fieldHeight / 2,
      };
      const item = currentItemsById.current.get(id);
      const anchoredState = anchoredDefinition ? bodyStates.get(anchoredDefinition.id) : undefined;
      const protectedBounds: ProtectedBounds[] = titleBounds ? [titleBounds] : [];
      if (id !== anchoredDefinition?.id && !item?.isExpanded && anchoredState?.isInWorld) {
        protectedBounds.push({
          left: anchoredState.body.position.x - anchoredState.width / 2 - returnZonePadding,
          right: anchoredState.body.position.x + anchoredState.width / 2 + returnZonePadding,
          top: anchoredState.body.position.y - anchoredState.height / 2 - returnZonePadding,
          bottom: anchoredState.body.position.y + anchoredState.height / 2 + returnZonePadding,
        });
      }

      const overlapsProtectedZone = (candidate: Matter.Vector) => protectedBounds.some((bounds) => (
        candidate.x + width / 2 > bounds.left
        && candidate.x - width / 2 < bounds.right
        && candidate.y + height / 2 > bounds.top
        && candidate.y - height / 2 < bounds.bottom
      ));

      if (!overlapsProtectedZone(constrainedPosition)) {
        return constrainedPosition;
      }

      const candidates = protectedBounds.flatMap((bounds) => [
        { x: bounds.left - width / 2, y: constrainedPosition.y },
        { x: bounds.right + width / 2, y: constrainedPosition.y },
        { x: constrainedPosition.x, y: bounds.top - height / 2 },
        { x: constrainedPosition.x, y: bounds.bottom + height / 2 },
      ]).map((candidate) => ({
        x: minimumX <= maximumX ? clamp(candidate.x, minimumX, maximumX) : fieldWidth / 2,
        y: minimumY <= maximumY ? clamp(candidate.y, minimumY, maximumY) : fieldHeight / 2,
      })).filter((candidate) => (
        candidate.x - width / 2 >= fieldMargin
        && candidate.x + width / 2 <= fieldWidth - fieldMargin
        && candidate.y - height / 2 >= fieldMargin
        && candidate.y + height / 2 <= fieldHeight - fieldMargin
        && !overlapsProtectedZone(candidate)
      ));

      return candidates.reduce((nearest, candidate) => {
        const nearestDistance = (nearest.x - constrainedPosition.x) ** 2 + (nearest.y - constrainedPosition.y) ** 2;
        const candidateDistance = (candidate.x - constrainedPosition.x) ** 2 + (candidate.y - constrainedPosition.y) ** 2;
        return candidateDistance < nearestDistance ? candidate : nearest;
      }, candidates[0] ?? constrainedPosition);
    };

    const drawBodies = () => {
      bodyStates.forEach((state, id) => {
        const currentDefinition = currentItemsById.current.get(id);
        const isVisible = currentDefinition?.isVisible !== false;
        if (!isVisible) {
          if (state.isInWorld) {
            Matter.Composite.remove(engine.world, state.body);
            state.isInWorld = false;
          }
          state.isLaunched = false;
          state.body.frictionAir = 0;
          state.element.style.transform = `translate3d(${state.body.position.x - state.width / 2}px, ${state.body.position.y - state.height / 2}px, 0)`;
          return;
        }

        if (!state.isInWorld) {
          Matter.Composite.add(engine.world, state.body);
          state.isInWorld = true;
          if (!motionIsReduced) {
            const angle = (state.body.id + 1) * 2.399;
            Matter.Body.setVelocity(state.body, { x: Math.cos(angle) * 0.42, y: Math.sin(angle) * 0.42 });
          }
        }

        const width = state.element.offsetWidth;
        const height = state.element.offsetHeight;
        if (width > 0 && height > 0 && (Math.abs(width - state.width) >= 1 || Math.abs(height - state.height) >= 1)) {
          Matter.Body.scale(state.body, width / state.width, height / state.height);
          state.width = width;
          state.height = height;
        }

        const definition = definitionById.get(id);
        const targetPosition = definition?.anchor === 'left'
          ? {
            x: Math.min(state.width / 2 + 18, fieldWidth - state.width / 2 - fieldMargin),
            y: fieldHeight / 2,
          }
          : getConstrainedPosition(id, state.width, state.height, state.body.position);

        if (Math.abs(state.body.position.x - targetPosition.x) > 0.1 || Math.abs(state.body.position.y - targetPosition.y) > 0.1) {
          Matter.Body.setPosition(state.body, targetPosition);
        }

        state.element.style.transform = `translate3d(${state.body.position.x - state.width / 2}px, ${state.body.position.y - state.height / 2}px, 0)`;
      });
    };
    drawBodiesRef.current = drawBodies;

    const createWalls = () => {
      const options = { isStatic: true, restitution: 1, friction: 0, frictionAir: 0 };
      return [
        Matter.Bodies.rectangle(fieldWidth / 2, -wallThickness / 2, fieldWidth + wallThickness * 2, wallThickness, options),
        Matter.Bodies.rectangle(fieldWidth / 2, fieldHeight + wallThickness / 2, fieldWidth + wallThickness * 2, wallThickness, options),
        Matter.Bodies.rectangle(-wallThickness / 2, fieldHeight / 2, wallThickness, fieldHeight + wallThickness * 2, options),
        Matter.Bodies.rectangle(fieldWidth + wallThickness / 2, fieldHeight / 2, wallThickness, fieldHeight + wallThickness * 2, options),
      ];
    };

    const addWalls = () => {
      walls = createWalls();
      Matter.Composite.add(engine.world, walls);
    };

    const removeWalls = () => {
      walls.forEach((wall) => Matter.Composite.remove(engine.world, wall));
      walls = [];
    };

    const movingDefinitions = definitions.filter((item) => item.anchor !== 'left');
    const movingSizes = movingDefinitions.map((item) => {
      const element = itemElements.current.get(item.id);
      return element ? getSize(element) : { width: 1, height: 1 };
    });
    const maximumDimension = Math.max(1, ...movingSizes.map((size) => Math.max(size.width, size.height)));
    const leftEdge = maximumDimension / 2 + fieldMargin;
    const rightEdge = Math.max(leftEdge + maximumDimension, fieldWidth - maximumDimension / 2 - fieldMargin);
    const movingWidth = Math.max(maximumDimension, rightEdge - leftEdge);
    const columnCount = movingDefinitions.length === 0
      ? 1
      : Math.max(1, Math.min(movingDefinitions.length, Math.floor(movingWidth / (maximumDimension * 1.06))));
    const rowCount = Math.max(1, Math.ceil(movingDefinitions.length / columnCount));
    const topEdge = maximumDimension / 2 + fieldMargin;
    const bottomEdge = Math.max(topEdge, fieldHeight - maximumDimension / 2 - fieldMargin);

    definitions.forEach((item, itemIndex) => {
      const element = itemElements.current.get(item.id);
      if (!element) {
        return;
      }

      const size = getSize(element);
      const movingIndex = movingDefinitions.findIndex((movingItem) => movingItem.id === item.id);
      const column = movingIndex < 0 ? 0 : movingIndex % columnCount;
      const row = movingIndex < 0 ? 0 : Math.floor(movingIndex / columnCount);
      const centerX = item.anchor === 'left'
        ? anchoredCenterX
        : leftEdge + (column + 0.5) * (movingWidth / columnCount);
      const centerY = item.anchor === 'left'
        ? fieldHeight / 2
        : topEdge + ((row + 0.5) / rowCount) * (bottomEdge - topEdge);

      const body = Matter.Bodies.rectangle(centerX, centerY, size.width, size.height, {
        isStatic: item.anchor === 'left',
        restitution: 0.96,
        friction: 0,
        frictionAir: 0,
        inertia: Infinity,
      });

      if (item.anchor !== 'left' && !motionIsReduced) {
        const angle = (itemIndex + 1) * 2.399;
        const speed = 0.32 + (itemIndex % 3) * 0.12;
        Matter.Body.setVelocity(body, { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed });
      }

      const isInWorld = item.isVisible !== false;
      bodyStates.set(item.id, { body, element, width: size.width, height: size.height, isInWorld, isLaunched: false });
      if (isInWorld) {
        Matter.Composite.add(engine.world, body);
      }
    });

    syncTitleObstacle();
    addWalls();
    drawBodies();

    const recordPointerSample = (event: PointerEvent) => {
      pointerState.samples.push({ x: event.clientX, y: event.clientY, time: event.timeStamp });
      while (pointerState.samples.length > maximumPointerSamples) {
        pointerState.samples.shift();
      }
      while (
        pointerState.samples.length > 2
        && event.timeStamp - pointerState.samples[0].time > launchSampleWindow
      ) {
        pointerState.samples.shift();
      }
    };

    const getReleaseVelocity = (): Matter.Vector | null => {
      const samples = pointerState.samples;
      if (samples.length < 2) {
        return null;
      }

      const lastSample = samples[samples.length - 1];
      const firstRecentIndex = samples.findIndex((sample) => lastSample.time - sample.time <= launchSampleWindow);
      const firstSample = samples[firstRecentIndex >= 0 ? firstRecentIndex : samples.length - 2];
      const elapsed = Math.max(lastSample.time - firstSample.time, 1);
      const scale = physicsStep / elapsed;
      const velocity = {
        x: (lastSample.x - firstSample.x) * scale,
        y: (lastSample.y - firstSample.y) * scale,
      };
      const speed = Math.hypot(velocity.x, velocity.y);
      if (speed < minimumLaunchSpeed) {
        return null;
      }

      const speedScale = Math.min(1, maximumLaunchSpeed / speed);
      return { x: velocity.x * speedScale, y: velocity.y * speedScale };
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || !(event.target instanceof Element)) {
        return;
      }
      const node = event.target.closest('.floating-node');
      if (!(node instanceof HTMLElement) || node.classList.contains('floating-node--anchored')) {
        return;
      }
      const bodyState = node.dataset.floatingId ? bodyStates.get(node.dataset.floatingId) : undefined;
      if (!bodyState || !bodyState.isInWorld || bodyState.body.isStatic) {
        return;
      }

      const fieldBounds = field.getBoundingClientRect();
      const pointerX = event.clientX - fieldBounds.left;
      const pointerY = event.clientY - fieldBounds.top;
      pointerState.isActive = true;
      pointerState.pointerId = event.pointerId;
      pointerState.startX = event.clientX;
      pointerState.startY = event.clientY;
      pointerState.hasMoved = false;
      pointerState.bodyState = bodyState;
      pointerState.offsetX = bodyState.body.position.x - pointerX;
      pointerState.offsetY = bodyState.body.position.y - pointerY;
      pointerState.samples = [];
      recordPointerSample(event);
      bodyState.isLaunched = false;
      bodyState.body.frictionAir = 0;
      Matter.Body.setVelocity(bodyState.body, { x: 0, y: 0 });
      currentInteractionChange.current?.(node.dataset.floatingId?.startsWith('artwork:') ? node.dataset.floatingId : null);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const body = pointerState.bodyState?.body;
      if (!pointerState.isActive || !body || pointerState.pointerId !== event.pointerId) {
        return;
      }

      if (!pointerState.hasMoved && Math.hypot(event.clientX - pointerState.startX, event.clientY - pointerState.startY) > 5) {
        pointerState.hasMoved = true;
        field.classList.add('is-dragging');
        field.setPointerCapture(event.pointerId);
      }
      if (!pointerState.hasMoved) {
        return;
      }

      recordPointerSample(event);
      const fieldBounds = field.getBoundingClientRect();
      const halfWidth = (body.bounds.max.x - body.bounds.min.x) / 2;
      const halfHeight = (body.bounds.max.y - body.bounds.min.y) / 2;
      const draggingId = pointerState.bodyState?.element.dataset.floatingId;
      const targetX = event.clientX - fieldBounds.left + pointerState.offsetX;
      const targetY = event.clientY - fieldBounds.top + pointerState.offsetY;

      Matter.Body.setPosition(body, getConstrainedPosition(
        draggingId ?? '',
        halfWidth * 2,
        halfHeight * 2,
        { x: targetX, y: targetY },
      ));
      Matter.Body.setVelocity(body, { x: 0, y: 0 });
      drawBodies();
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!pointerState.isActive || pointerState.pointerId !== event.pointerId) {
        return;
      }
      if (pointerState.hasMoved && event.type === 'pointerup') {
        suppressDragClick = true;
        recordPointerSample(event);
        const releaseVelocity = motionIsReduced ? null : getReleaseVelocity();
        const bodyState = pointerState.bodyState;
        if (bodyState && releaseVelocity) {
          bodyState.isLaunched = true;
          bodyState.body.frictionAir = launchFrictionAir;
          Matter.Body.setVelocity(bodyState.body, releaseVelocity);
        }
      }
      if (field.hasPointerCapture(event.pointerId)) {
        field.releasePointerCapture(event.pointerId);
      }
      pointerState.isActive = false;
      pointerState.pointerId = null;
      pointerState.hasMoved = false;
      pointerState.bodyState = null;
      pointerState.samples = [];
      currentInteractionChange.current?.(null);
      field.classList.remove('is-dragging');
    };

    const handleClickCapture = (event: MouseEvent) => {
      if (suppressDragClick && event.detail > 0) {
        suppressDragClick = false;
        event.preventDefault();
        event.stopPropagation();
      }
    };

    field.addEventListener('pointerdown', handlePointerDown);
    field.addEventListener('click', handleClickCapture, true);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    const keepBubblesMoving = () => {
      bodyStates.forEach((state) => {
        const { body, isInWorld } = state;
        if (body.isStatic || !isInWorld || pointerState.bodyState?.body === body) {
          return;
        }
        const speed = Math.hypot(body.velocity.x, body.velocity.y);
        if (state.isLaunched && speed > 1.1) {
          return;
        }
        if (state.isLaunched) {
          state.isLaunched = false;
          body.frictionAir = 0;
        }
        if (speed >= 0.3 && speed <= 1.1) {
          return;
        }
        const angle = speed > 0.001 ? Math.atan2(body.velocity.y, body.velocity.x) : (body.id + 1) * 2.399;
        const targetSpeed = speed < 0.3 ? 0.3 : 1.1;
        Matter.Body.setVelocity(body, { x: Math.cos(angle) * targetSpeed, y: Math.sin(angle) * targetSpeed });
      });
    };

    const animate = (time: number) => {
      if (motionIsReduced) {
        animationFrame = null;
        drawBodies();
        return;
      }

      const elapsed = previousFrameTime === 0 ? physicsStep : Math.min(time - previousFrameTime, 100);
      previousFrameTime = time;
      accumulatedTime += elapsed;
      while (accumulatedTime >= physicsStep) {
        Matter.Engine.update(engine, physicsStep);
        keepBubblesMoving();
        accumulatedTime -= physicsStep;
      }
      drawBodies();
      animationFrame = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (animationFrame === null && !motionIsReduced) {
        previousFrameTime = 0;
        accumulatedTime = 0;
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const resizeField = () => {
      const nextWidth = field.clientWidth;
      const nextHeight = field.clientHeight;
      if (nextWidth < 1 || nextHeight < 1) {
        return;
      }

      const fieldSizeChanged = nextWidth !== fieldWidth || nextHeight !== fieldHeight;
      if (fieldSizeChanged) {
        removeWalls();
        fieldWidth = nextWidth;
        fieldHeight = nextHeight;
      }
      syncTitleObstacle();
      if (fieldSizeChanged) {
        addWalls();
      }

      bodyStates.forEach((state, id) => {
        const item = currentItemsById.current.get(id);
        if (item?.anchor === 'left') {
          const centerX = Math.min(state.width / 2 + 18, fieldWidth - state.width / 2 - fieldMargin);
          Matter.Body.setPosition(state.body, { x: centerX, y: fieldHeight / 2 });
        } else {
          Matter.Body.setPosition(state.body, getConstrainedPosition(id, state.width, state.height, state.body.position));
        }
      });

      drawBodies();
    };

    const resizeItems = new ResizeObserver(drawBodies);
    bodyStates.forEach(({ element }) => resizeItems.observe(element));
    const resizeFieldObserver = new ResizeObserver(resizeField);
    resizeFieldObserver.observe(field);
    window.addEventListener('resize', resizeField);

    if (!motionIsReduced) {
      startAnimation();
    }

    return () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
      drawBodiesRef.current = null;
      currentInteractionChange.current?.(null);
      field.removeEventListener('pointerdown', handlePointerDown);
      field.removeEventListener('click', handleClickCapture, true);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('resize', resizeField);
      resizeItems.disconnect();
      resizeFieldObserver.disconnect();
      Matter.Engine.clear(engine);
      bodyStates.forEach(({ element }) => {
        element.style.transform = '';
      });
    };
  }, [isMotionReduced, itemSignature]);

  useLayoutEffect(() => {
    drawBodiesRef.current?.();
  }, [itemSizeSignature]);

  return { fieldRef, registerElement };
}
