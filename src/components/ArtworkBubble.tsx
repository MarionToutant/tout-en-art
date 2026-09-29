import { useEffect, useId, type PointerEvent as ReactPointerEvent } from 'react';
import type { BubbleData } from '../types/bubble';
import useLoadedImage from '../hooks/useLoadedImage';
import BubbleBase from './BubbleBase';

interface IArtworkBubbleProps extends BubbleData {
  readonly isSelected: boolean;
  readonly onSelect: () => void;
}

export default function ArtworkBubble({
  mediaFile,
  title,
  subtitle,
  year,
  isSelected,
  onSelect,
}: IArtworkBubbleProps) {
  const detailsId = `artwork-details-${useId()}`;
  const { imageRef: photoRef, isLoaded, onLoad } = useLoadedImage(mediaFile);
  const accessibleLabel = [title, subtitle, year].filter(Boolean).join(', ') || 'Œuvre';

  useEffect(() => {
    if (!isSelected) {
      photoRef.current?.style.removeProperty('object-position');
    }
  }, [isSelected]);

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!isSelected || event.pointerType === 'touch') {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    if (bounds.width === 0 || bounds.height === 0) {
      return;
    }

    const focusX = Math.round(Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100)));
    const focusY = Math.round(Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100)));
    photoRef.current?.style.setProperty('object-position', `${focusX}% ${focusY}%`);
  };

  const resetArtworkFocus = () => photoRef.current?.style.removeProperty('object-position');

  return (
    <BubbleBase
      className={`artwork-button${isSelected ? ' artwork-button--selected' : ''}${isLoaded ? ' bubble--image-loaded' : ' bubble--image-pending'}`}
      onClick={onSelect}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetArtworkFocus}
      aria-label={`${accessibleLabel}. ${isSelected ? 'Masquer les informations' : 'Afficher les informations'}`}
      aria-hidden={!isLoaded}
      aria-expanded={isSelected}
      aria-controls={detailsId}
      tabIndex={isLoaded ? undefined : -1}
    >
      <img ref={photoRef} className="bubble-image artwork-photo" src={mediaFile} alt="" draggable={false} loading="eager" decoding="async" onLoad={onLoad} />
      <span
        className={`artwork-information${isSelected ? ' artwork-information--visible' : ''}`}
        id={detailsId}
        aria-hidden={!isSelected}
      >
        {title ? <span className="artwork-title">{title}</span> : null}
        {subtitle ? <span className="artwork-detail-line">{subtitle}</span> : null}
        {year ? <span className="artwork-detail-line">{year}</span> : null}
      </span>
    </BubbleBase>
  );
}
