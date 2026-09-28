import type { ReactNode } from 'react';

export interface FloatingFieldItem {
  readonly id: string;
  readonly kind: 'category' | 'artwork';
  readonly content: ReactNode;
  readonly isExpanded?: boolean;
  readonly isVisible?: boolean;
  readonly anchor?: 'left';
  readonly role?: 'listitem';
}
