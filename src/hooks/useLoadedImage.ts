import { useEffect, useRef, useState } from 'react';

export default function useLoadedImage(src: string) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [loadedSource, setLoadedSource] = useState<string | null>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) {
      setLoadedSource(src);
    }
  }, [src]);

  return {
    imageRef,
    isLoaded: loadedSource === src,
    onLoad: () => setLoadedSource(src),
  };
}
