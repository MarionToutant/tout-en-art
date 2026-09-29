import { useCallback, useEffect, useRef, useState } from 'react';
import { sections } from '../data/bubbles';

const categoryBurstDuration = 500;

const sectionTitleToSlug = (title: string) => title
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/\s+/g, '-');

const sectionIndexFromPathname = (pathname: string) => {
  const slug = pathname.split('/').filter(Boolean).pop()?.toLowerCase();
  if (!slug) {
    return null;
  }

  const sectionIndex = sections.findIndex((section) => sectionTitleToSlug(section.title) === slug);
  return sectionIndex < 0 ? null : sectionIndex;
};

export default function useCategoryNavigation(isMotionReduced: boolean) {
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(() => sectionIndexFromPathname(window.location.pathname));
  const [burstingSectionIndex, setBurstingSectionIndex] = useState<number | null>(null);
  const transitionTimer = useRef<number | null>(null);
  const burstingSectionRef = useRef<number | null>(null);
  const activeSection = activeSectionIndex === null ? null : sections[activeSectionIndex];

  useEffect(() => {
    const handlePopState = () => {
      if (transitionTimer.current !== null) {
        window.clearTimeout(transitionTimer.current);
        transitionTimer.current = null;
      }
      burstingSectionRef.current = null;
      setBurstingSectionIndex(null);
      setActiveSectionIndex(sectionIndexFromPathname(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (transitionTimer.current !== null) {
        window.clearTimeout(transitionTimer.current);
      }
    };
  }, []);

  const openSection = useCallback((sectionIndex: number) => {
    if (burstingSectionRef.current !== null) {
      return;
    }

    burstingSectionRef.current = sectionIndex;
    setBurstingSectionIndex(sectionIndex);
    window.history.pushState(null, '', `/${sectionTitleToSlug(sections[sectionIndex].title)}`);
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
    if (window.location.pathname !== '/') {
      window.history.replaceState(null, '', '/');
    }
  }, []);

  return {
    activeSection,
    activeSectionIndex,
    burstingSectionIndex,
    openSection,
    returnToCategories,
  };
}
