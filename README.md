# IndusSource Engineering

Premium B2B corporate website for **IndusSource Engineering** — an industrial sourcing partner for road construction machinery, automation systems, electrical components, and OEM spare parts across India.

Built to communicate trust, engineering precision, and enterprise credibility with a minimal, modern interface.

---

## Project Status

| Area | Status |
|------|--------|
| Homepage | Complete |
| Layout (Navbar, Footer) | Complete |
| Routing & page scaffold | Complete |
| Secondary pages (About, Products, etc.) | Placeholder |
| Admin dashboard / backend | Not started |

---

## What's Built

### Homepage (`/`)

A fully composed landing page with eleven sections:

| Section | Description |
|---------|-------------|
| **Hero** | Full-viewport hero with headline, CTAs, and scroll indicator |
| **Trusted Brands** | Partner / OEM brand showcase |
| **About** | Company overview with value pillars and imagery |
| **Expertise** | Core capability cards (machinery, automation, electrical, spare parts) |
| **Industries** | Six industry verticals served |
| **Why Choose Us** | Differentiators with animated statistics |
| **Featured Products** | Product category highlights |
| **Featured Projects** | Case-study style project cards |
| **Testimonials** | Client quotes and social proof |
| **Call to Action** | RFQ prompt with trust badges |

All homepage sections use **Framer Motion** for subtle fade, slide, and stagger animations (max 0.6s).

### Layout & Navigation

- **Navbar** — Sticky header, active-route highlighting, mobile drawer menu, keyboard-accessible (Escape to close), RFQ CTA
- **Footer** — Four-column layout with quick links, solutions, contact details, and legal links
- **MainLayout** — Shared shell wrapping all pages

### Routing

| Route | Page | Status |
|-------|------|--------|
| `/` | Home | Complete |
| `/about` | About | Placeholder |
| `/expertise` | Expertise | Placeholder |
| `/products` | Products | Placeholder |
| `/projects` | Projects | Placeholder |
| `/partners` | Partners | Placeholder |
| `/contact` | Contact | Placeholder |
| `/rfq` | Request for Quote | Placeholder |
| `*` | Not Found | Placeholder |

> **Note:** Navbar includes a "How We Work" link (`/how-we-work`) that is not yet wired in the router.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| UI | React 19 |
| Build | Vite 8 |
| Routing | React Router 7 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React, React Icons |
| Utilities | clsx |

---

## Design System

Defined in [`docs/project_constitution.md`](docs/project_constitution.md).

| Token | Value |
|-------|-------|
| Primary | `#0F172A` |
| Accent | `#F97316` |
| Background | `#F8FAFC` |
| Body text | `#334155` |
| Headings | Poppins |
| Body | Inter |

Mobile-first responsive design from 320px to 1920px. Tailwind-only styling — no inline CSS or component libraries (Bootstrap, MUI, etc.).

---

## Repository Structure

```
project/
├── docs/
│   ├── project_constitution.md   # Coding & design standards
│   └── Business_Website_SRS.md     # Software requirements spec
└── frontend/
    └── src/
        ├── assets/                 # Images and static media
        ├── components/
        │   ├── home/               # Homepage sections
        │   └── layout/             # Navbar, Footer, MainLayout
        ├── pages/                  # Route-level pages
        ├── router/                 # AppRouter
        └── styles/                 # Global CSS & Tailwind theme
```

---

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## Roadmap (from SRS)

- [ ] Build out secondary pages (About, Expertise, Products, Projects, Partners, Contact, RFQ)
- [ ] Contact and inquiry forms with lead capture
- [ ] SEO metadata and page-level optimization
- [ ] Route lazy-loading
- [ ] Admin dashboard (future phase)

---

## Documentation

- [`docs/project_constitution.md`](docs/project_constitution.md) — Component rules, styling, accessibility, and design philosophy
- [`docs/Business_Website_SRS.md`](docs/Business_Website_SRS.md) — Full business and functional requirements
