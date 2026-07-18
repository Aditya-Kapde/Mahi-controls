# Mahi Controls — Frontend

React SPA for the Mahi Controls corporate website. See the [project README](../README.md) for full scope, architecture, and roadmap.

---

## Quick Start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |

---

## Source Layout

```
src/
├── components/
│   ├── home/       # Homepage sections (Hero, About, Expertise, …)
│   └── layout/     # Navbar, Footer, MainLayout
├── pages/          # Route pages
├── router/         # AppRouter (React Router)
├── styles/         # globals.css — Tailwind v4 theme & fonts
├── assets/         # Images
├── App.jsx
└── main.jsx
```

---

## Current Build

**Done:** Full homepage, responsive Navbar & Footer, React Router scaffold, Tailwind design tokens, Framer Motion animations.

**Pending:** Content pages (`/about`, `/products`, `/contact`, `/rfq`, etc.) are placeholders awaiting implementation.

---

## Conventions

Follow [`docs/project_constitution.md`](../docs/project_constitution.md) for component structure, naming, spacing, accessibility, and animation rules.
