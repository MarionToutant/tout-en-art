import type { ButtonHTMLAttributes, ReactNode } from 'react';

type BubbleBaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'draggable' | 'type'> & {
  readonly children: ReactNode;
  readonly className: string;
};

export default function BubbleBase({ className, children, ...buttonProps }: BubbleBaseProps) {
  return (
    <button
      {...buttonProps}
      className={`bubble ${className}`}
      type="button"
      draggable={false}
    >
      {children}
    </button>
  );
}
