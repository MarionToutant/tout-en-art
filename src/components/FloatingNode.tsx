import { useCallback } from 'react';
import type { FloatingFieldItem } from '../types/floatingField';

interface IFloatingNodeProps {
  readonly item: FloatingFieldItem;
  readonly registerElement: (id: string, element: HTMLDivElement | null) => void;
}

export default function FloatingNode({ item, registerElement }: IFloatingNodeProps) {
  const setElement = useCallback((element: HTMLDivElement | null) => {
    element?.toggleAttribute('inert', item.isVisible === false);
    registerElement(item.id, element);
  }, [item.id, item.isVisible, registerElement]);

  return (
    <div
      ref={setElement}
      className={`floating-node floating-node--${item.kind}${item.isExpanded ? ' floating-node--expanded' : ''}${item.anchor ? ' floating-node--anchored' : ''}${item.isVisible === false ? ' floating-node--hidden' : ''}`}
      data-floating-id={item.id}
      role={item.role}
      aria-hidden={item.isVisible === false}
    >
      {item.content}
    </div>
  );
}
