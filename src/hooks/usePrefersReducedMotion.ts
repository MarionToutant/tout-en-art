import { useEffect, useState } from 'react';

export default function usePrefersReducedMotion() {
  const [isMotionReduced, setIsMotionReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event: MediaQueryListEvent) => setIsMotionReduced(event.matches);
    preference.addEventListener('change', handleChange);
    return () => preference.removeEventListener('change', handleChange);
  }, []);

  return isMotionReduced;
}
