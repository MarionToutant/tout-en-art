# Art Tout-en-M

Personal website showcasing my artistic creations. Browse paintings, drawings, graffitis, and more organized by category.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool and dev server
- **Material-UI (MUI)** — UI components and theming

## Features

- Responsive image gallery organized into sections (Graffitis, Paysages & Objets, Portraits & Animaux, Jeunesse)
- Click any artwork to view it full-size in a modal
- Mobile-first responsive layout (1 → 2 → 3 → 4 columns)

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
│   ├── Home.tsx        # Main gallery layout
│   ├── TopBar.tsx      # Header banner
│   ├── CardItem.tsx    # Artwork thumbnail card
│   └── CardDialog.tsx  # Full-size artwork modal
├── data/
│   └── cards.ts        # Artwork data and section definitions
├── media/              # Artwork images
└── styles/
    └── Theme.ts        # MUI theme (black & white palette)
```