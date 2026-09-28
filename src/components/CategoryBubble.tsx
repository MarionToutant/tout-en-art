import type { CSSProperties } from 'react';
import BubbleBase from './BubbleBase';

interface ICategoryBubbleProps {
  readonly title: string;
  readonly mediaFile: string;
  readonly mode: 'menu' | 'parent';
  readonly isBursting?: boolean;
  readonly onClick: () => void;
}

export default function CategoryBubble({ title, mediaFile, mode, isBursting = false, onClick }: ICategoryBubbleProps) {
  const style = mode === 'menu' ? {
    '--bubble-image': `url("${mediaFile}")`,
  } as CSSProperties : undefined;

  return (
    <BubbleBase
      className={`category-bubble category-bubble--${mode}${isBursting ? ' category-bubble--burst' : ''}`}
      onClick={onClick}
      aria-label={mode === 'parent' ? `Revenir aux catégories depuis ${title}` : `Ouvrir la catégorie ${title}`}
      style={style}
    >
      {mode === 'menu' ? <span className="category-bubble__scrim" aria-hidden="true" /> : null}
      <span className="category-bubble__label">{title}</span>
    </BubbleBase>
  );
}
