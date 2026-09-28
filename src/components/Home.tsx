import Box from '@mui/material/Box';
import ArtworkBubble from './ArtworkBubble';
import CategoryBubble from './CategoryBubble';
import FloatingField, { type FloatingFieldItem } from './FloatingField';
import TopBar from './TopBar';
import { sections } from '../data/bubbles';
import type { BubbleData } from '../types/bubble';
import useArtworkSelection from '../hooks/useArtworkSelection';
import useBubbleVisibilityCycle from '../hooks/useBubbleVisibilityCycle';
import useCategoryNavigation from '../hooks/useCategoryNavigation';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import '../styles/BubbleScene.css';

const bubbleHandoffDuration = 3000;

export default function Home() {
  const isMotionReduced = usePrefersReducedMotion();
  const { activeSection, activeSectionIndex, burstingSectionIndex, openSection, returnToCategories } = useCategoryNavigation(isMotionReduced);
  const { activePointerArtworkRef, clearSelection, selectedArtwork, selectedArtworkRef, setActivePointerArtwork, toggleArtwork } = useArtworkSelection();
  const cycleBubbleIds = activeSection
    ? activeSection.bubbles.map((bubble) => `artwork:${bubble.mediaFile}`)
    : sections.map((section) => `category:${section.title}`);
  const { hiddenBubbleId } = useBubbleVisibilityCycle({
    viewKey: activeSection ? `artworks:${activeSection.title}` : 'categories',
    bubbleIdsSignature: cycleBubbleIds.join('\u0000'),
    handoffDuration: bubbleHandoffDuration,
    isMotionReduced,
    selectedArtworkRef,
    activePointerArtworkRef,
  });

  const returnToMenu = () => {
    returnToCategories();
    clearSelection();
  };

  const floatingItems: FloatingFieldItem[] = activeSection
    ? [
      {
        id: `category:${activeSection.title}`,
        kind: 'category',
        anchor: 'left',
        isExpanded: selectedArtwork !== null,
        role: 'listitem',
        content: (
          <CategoryBubble
            title={activeSection.title}
            mediaFile={activeSection.coverMediaFile ?? activeSection.bubbles[0].mediaFile}
            mode="parent"
            onClick={returnToMenu}
          />
        ),
      },
      ...activeSection.bubbles.map((bubble) => {
        const id = `artwork:${bubble.mediaFile}`;
        return {
        id,
        kind: 'artwork' as const,
        role: 'listitem' as const,
        isVisible: isMotionReduced || id !== hiddenBubbleId,
        isExpanded: selectedArtwork === bubble.mediaFile,
        content: (
          <ArtworkBubble
            {...bubble}
            isSelected={selectedArtwork === bubble.mediaFile}
            onSelect={() => toggleArtwork(bubble.mediaFile)}
          />
        ),
      };}),
    ]
    : sections.map((section, sectionIndex) => ({
      id: `category:${section.title}`,
      kind: 'category' as const,
      isVisible: isMotionReduced || `category:${section.title}` !== hiddenBubbleId,
      content: (
        <CategoryBubble
          title={section.title}
          mediaFile={section.coverMediaFile ?? section.bubbles[0].mediaFile}
          mode="menu"
          isBursting={burstingSectionIndex === sectionIndex}
          onClick={() => openSection(sectionIndex)}
        />
      ),
    }));

  return (
    <Box component="main" className="home-shell">
      <TopBar title="TOUT-EN-ART" />
      <Box className="gallery-scene">
        <Box
          component="section"
          className={`field-stage${activeSection ? ' field-stage--artworks' : ''}`}
          aria-label={activeSection ? activeSection.title : 'Catégories'}
          key={activeSection?.title ?? 'categories'}
        >
          <FloatingField
            items={floatingItems}
            ariaLabel={activeSection ? `Œuvres de ${activeSection.title}` : 'Catégories'}
            isMotionReduced={isMotionReduced}
            className={activeSection ? 'artwork-field' : 'category-field'}
            role={activeSection ? 'list' : 'region'}
            onInteractionChange={setActivePointerArtwork}
          />
        </Box>
      </Box>
    </Box>
  );
}
