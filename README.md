# TOUT-EN-ART

Personal website showcasing my artistic creations through a compact, animated bubble gallery.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool and dev server
- **Material-UI (MUI)** — UI components and theming
- **Matter.js** — bubble movement and collisions
- System UI font stack

## Features

- Rounded-square category and artwork bubbles drift and rebound around the viewport
- Drag category and artwork bubbles with a mouse or touch; the pinned return bubble stays fixed
- Category bubbles use artwork photography instead of category color accents
- Click a category to reveal its artwork bubbles; its pinned bubble on the left returns to the category menu
- One category or artwork bubble disappears at a time, returning after three seconds as the next bubble disappears
- Click an artwork bubble to enlarge it and show its title, medium, and year on separate lines
- Viewport-fitted layout with reduced-motion support and a static artwork view for reduced-motion preferences
- One moderately optimized JPEG per artwork, stored directly in `src/media/`

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The page reloads automatically on changes.

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |

## Project Structure

```
src/
├── components/
│   ├── Home.tsx          # Viewport-fitted bubble gallery
│   ├── TopBar.tsx        # Compact text-only header
│   ├── FloatingField.tsx # Matter.js motion and collisions
│   ├── BubbleBase.tsx    # Shared native bubble button
│   ├── CategoryBubble.tsx # Category and pinned parent bubbles
│   └── ArtworkBubble.tsx # Artwork bubble and inline details
├── hooks/                # Gallery state, visibility, physics, and pointer hooks
├── data/
│   └── bubbles.ts      # Bubble data and section definitions
├── types/
│   ├── bubble.ts       # Shared bubble and section types
│   └── floatingField.ts # Floating-field item type
├── media/              # One JPEG rendition per artwork
└── styles/
    ├── BubbleScene.css # Bubble scene layout and appearance
    └── Theme.ts        # MUI theme and system typography
```
