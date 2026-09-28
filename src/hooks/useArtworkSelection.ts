import { useCallback, useRef, useState } from 'react';

export default function useArtworkSelection() {
  const [selectedArtwork, setSelectedArtwork] = useState<string | null>(null);
  const selectedArtworkRef = useRef(selectedArtwork);
  const activePointerArtworkRef = useRef<string | null>(null);
  selectedArtworkRef.current = selectedArtwork;

  const toggleArtwork = useCallback((mediaFile: string) => {
    setSelectedArtwork((currentArtwork) => currentArtwork === mediaFile ? null : mediaFile);
  }, []);

  const clearSelection = useCallback(() => setSelectedArtwork(null), []);

  const setActivePointerArtwork = useCallback((itemId: string | null) => {
    activePointerArtworkRef.current = itemId?.startsWith('artwork:')
      ? itemId.slice('artwork:'.length)
      : null;
  }, []);

  return {
    activePointerArtworkRef,
    clearSelection,
    selectedArtwork,
    selectedArtworkRef,
    setActivePointerArtwork,
    toggleArtwork,
  };
}
