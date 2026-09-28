import { useEffect, useState, type MutableRefObject } from 'react';

interface IUseBubbleVisibilityCycleOptions {
  readonly viewKey: string;
  readonly bubbleIdsSignature: string;
  readonly handoffDuration: number;
  readonly isMotionReduced: boolean;
  readonly selectedArtworkRef: MutableRefObject<string | null>;
  readonly activePointerArtworkRef: MutableRefObject<string | null>;
}

interface IBubbleCycleState {
  readonly viewKey: string;
  readonly bubbleIdsSignature: string;
  readonly isMotionReduced: boolean;
  readonly hiddenBubbleId: string | null;
  readonly nextIndex: number;
}

const bubbleIdSeparator = '\u0000';

function createCycleState(viewKey: string, bubbleIdsSignature: string, isMotionReduced: boolean): IBubbleCycleState {
  const bubbleIds = bubbleIdsSignature ? bubbleIdsSignature.split(bubbleIdSeparator) : [];
  return {
    viewKey,
    bubbleIdsSignature,
    isMotionReduced,
    hiddenBubbleId: isMotionReduced ? null : bubbleIds[0] ?? null,
    nextIndex: bubbleIds.length > 1 ? 1 : 0,
  };
}

export default function useBubbleVisibilityCycle({
  viewKey,
  bubbleIdsSignature,
  handoffDuration,
  isMotionReduced,
  selectedArtworkRef,
  activePointerArtworkRef,
}: IUseBubbleVisibilityCycleOptions) {
  const [cycleState, setCycleState] = useState(() => createCycleState(viewKey, bubbleIdsSignature, isMotionReduced));
  const cycleIsCurrent = cycleState.viewKey === viewKey
    && cycleState.bubbleIdsSignature === bubbleIdsSignature
    && cycleState.isMotionReduced === isMotionReduced;

  if (!cycleIsCurrent) {
    setCycleState(createCycleState(viewKey, bubbleIdsSignature, isMotionReduced));
  }

  const bubbleIds = bubbleIdsSignature ? bubbleIdsSignature.split(bubbleIdSeparator) : [];
  const hiddenBubbleId = isMotionReduced
    ? null
    : cycleIsCurrent
      ? cycleState.hiddenBubbleId
      : bubbleIds[0] ?? null;

  useEffect(() => {
    const activeBubbleIds = bubbleIdsSignature ? bubbleIdsSignature.split(bubbleIdSeparator) : [];
    if (isMotionReduced || activeBubbleIds.length < 2) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setCycleState((currentState) => {
        const currentCycleIsValid = currentState.viewKey === viewKey
          && currentState.bubbleIdsSignature === bubbleIdsSignature
          && !currentState.isMotionReduced;
        const currentHiddenBubbleId = currentCycleIsValid
          ? currentState.hiddenBubbleId
          : activeBubbleIds[0] ?? null;
        let nextIndex = currentCycleIsValid ? currentState.nextIndex : 1;
        let nextHiddenBubbleId: string | null = null;
        let fallbackBubbleId: string | null = null;

        for (let attempt = 0; attempt < activeBubbleIds.length; attempt += 1) {
          const candidateId = activeBubbleIds[nextIndex];
          nextIndex = (nextIndex + 1) % activeBubbleIds.length;
          if (!candidateId || candidateId === currentHiddenBubbleId) {
            continue;
          }

          fallbackBubbleId ??= candidateId;
          if (candidateId.startsWith('artwork:')) {
            const mediaFile = candidateId.slice('artwork:'.length);
            if (mediaFile === selectedArtworkRef.current || mediaFile === activePointerArtworkRef.current) {
              continue;
            }
          }

          nextHiddenBubbleId = candidateId;
          break;
        }

        return {
          viewKey,
          bubbleIdsSignature,
          isMotionReduced: false,
          hiddenBubbleId: nextHiddenBubbleId ?? fallbackBubbleId,
          nextIndex,
        };
      });
    }, handoffDuration);

    return () => window.clearInterval(intervalId);
  }, [activePointerArtworkRef, bubbleIdsSignature, handoffDuration, isMotionReduced, selectedArtworkRef, viewKey]);

  return { hiddenBubbleId };
}
