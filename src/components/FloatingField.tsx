import useFloatingField from '../hooks/useFloatingField';
import type { FloatingFieldItem } from '../types/floatingField';
import FloatingNode from './FloatingNode';

export type { FloatingFieldItem } from '../types/floatingField';

interface IFloatingFieldProps {
  readonly items: readonly FloatingFieldItem[];
  readonly ariaLabel: string;
  readonly isMotionReduced: boolean;
  readonly className?: string;
  readonly role?: 'list' | 'region';
  readonly onInteractionChange?: (itemId: string | null) => void;
}

export default function FloatingField({
  items,
  ariaLabel,
  isMotionReduced,
  className = '',
  role = 'region',
  onInteractionChange,
}: IFloatingFieldProps) {
  const { fieldRef, registerElement } = useFloatingField({ items, isMotionReduced, onInteractionChange });

  return (
    <div
      ref={fieldRef}
      className={`floating-field ${className}`.trim()}
      role={role}
      aria-label={ariaLabel}
    >
      {items.map((item) => (
        <FloatingNode key={item.id} item={item} registerElement={registerElement} />
      ))}
    </div>
  );
}
