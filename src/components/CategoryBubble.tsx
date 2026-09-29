import useLoadedImage from '../hooks/useLoadedImage';
import BubbleBase from './BubbleBase';

interface ICategoryBubbleProps {
  readonly title: string;
  readonly mediaFile: string;
  readonly mode: 'menu' | 'parent';
  readonly isBursting?: boolean;
  readonly onClick: () => void;
}

export default function CategoryBubble({ title, mediaFile, mode, isBursting = false, onClick }: ICategoryBubbleProps) {
  const { imageRef, isLoaded, onLoad } = useLoadedImage(mediaFile);
  const isImagePending = mode === 'menu' && !isLoaded;
  const imageStateClass = mode === 'menu' ? (isLoaded ? ' bubble--image-loaded' : ' bubble--image-pending') : '';

  return (
    <BubbleBase
      className={`category-bubble category-bubble--${mode}${isBursting ? ' category-bubble--burst' : ''}${imageStateClass}`}
      onClick={onClick}
      aria-label={mode === 'parent' ? `Revenir aux catégories depuis ${title}` : `Ouvrir la catégorie ${title}`}
      aria-hidden={isImagePending}
      tabIndex={isImagePending ? -1 : undefined}
    >
      {mode === 'menu' ? (
        <>
          <img ref={imageRef} className="bubble-image" src={mediaFile} alt="" draggable={false} loading="eager" decoding="async" onLoad={onLoad} />
          <span className="category-bubble__scrim" aria-hidden="true" />
        </>
      ) : null}
      <span className="category-bubble__label">{title}</span>
    </BubbleBase>
  );
}
