import { useCallback, useEffect, useRef, useState } from 'react';
import { sections } from '../data/bubbles';

const categoryBurstDuration = 500;

export default function useCategoryNavigation(isMotionReduced: boolean) {
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);
  const [burstingSectionIndex, setBurstingSectionIndex] = useState<number | null>(null);
  const transitionTimer = useRef<number | null>(null);
  const burstingSectionRef = useRef<number | null>(null);
  const activeSection = activeSectionIndex === null ? null : sections[activeSectionIndex];

  useEffect(() => () => {
    if (transitionTimer.current !== null) {
      window.clearTimeout(transitionTimer.current);
    }
  }, []);

  const openSection = useCallback((sectionIndex: number) => {
    if (burstingSectionRef.current !== null) {
      return;
    }

    burstingSectionRef.current = sectionIndex;
    setBurstingSectionIndex(sectionIndex);
    transitionTimer.current = window.setTimeout(() => {
      transitionTimer.current = null;
      setActiveSectionIndex(sectionIndex);
      setBurstingSectionIndex(null);
      burstingSectionRef.current = null;
    }, isMotionReduced ? 0 : categoryBurstDuration);
  }, [isMotionReduced]);

  const returnToCategories = useCallback(() => {
    if (transitionTimer.current !== null) {
      window.clearTimeout(transitionTimer.current);
      transitionTimer.current = null;
    }
    burstingSectionRef.current = null;
    setBurstingSectionIndex(null);
    setActiveSectionIndex(null);
  }, []);

  return {
    activeSection,
    activeSectionIndex,
    burstingSectionIndex,
    openSection,
    returnToCategories,
  };
}
