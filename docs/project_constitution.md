# IndusSource Frontend Project Constitution v1.0

## 1. Project Vision

Develop a premium, enterprise-grade B2B industrial sourcing website for IndusSource Engineering.

The website should communicate trust, authority, engineering precision, and professionalism while remaining minimal, modern, and easy to use.

The final website should feel comparable to Siemens, ABB, Caterpillar, Bosch Industrial, or Schneider Electric.

---

## 2. Technology Stack

* React 19
* Vite 8
* React Router
* Tailwind CSS v4
* Framer Motion
* Lucide React
* clsx

No Bootstrap.

No Material UI.

No Chakra UI.

No inline CSS.

---

## 3. Folder Structure

src/

* assets/
* components/

  * ui/
  * layout/
  * home/
  * about/
  * expertise/
  * products/
  * projects/
  * partners/
  * contact/
  * rfq/
* pages/
* layouts/
* router/
* hooks/
* services/
* utils/
* constants/
* styles/

---

## 4. Component Rules

* Functional Components only.
* Never use class components.
* One component = one responsibility.
* Maximum one default export per file.
* Keep components reusable.
* No duplicated UI.

---

## 5. Styling Rules

* Tailwind CSS only.
* Never use inline style unless absolutely necessary.
* Never repeat long utility groups unnecessarily.
* Maintain consistent spacing.

Spacing scale:

8
16
24
32
48
64
96

---

## 6. Naming Rules

PascalCase

Navbar.jsx

HeroSection.jsx

ProductCard.jsx

camelCase

formatPrice()

generateSlug()

UPPER_CASE

API_URL

NAV_ITEMS

---

## 7. Responsive Rules

Always Mobile First.

Support

320px

375px

425px

768px

1024px

1280px

1440px

1920px

Never allow horizontal scrolling.

---

## 8. Accessibility

Always use semantic HTML.

Every image needs alt text.

Buttons need aria-label when required.

Keyboard navigation must work.

---

## 9. Performance

Lazy load routes.

Lazy load images.

Minimize re-renders.

Avoid unnecessary state.

---

## 10. Animations

Framer Motion only.

Animations should be subtle.

No flashy effects.

Fade

Slide

Scale

Stagger

Maximum duration:

0.6 seconds

---

## 11. Code Style

Use descriptive variable names.

Avoid magic numbers.

Comment only complex logic.

Use early returns.

Avoid nested conditionals.

---

## 12. Design Philosophy

Industrial

Premium

Minimal

Trustworthy

Professional

Enterprise

Engineering-first

Large whitespace

Strong typography

Simple interactions

High readability

Never make the website look like a startup SaaS landing page.

---

## 13. Color Palette

Primary

#0F172A

Accent

#F97316

Background

#F8FAFC

White

#FFFFFF

Text

#334155

Success

#16A34A

Warning

#EA580C

Error

#DC2626

---

## 14. Typography

Headings

Poppins

Body

Inter

---

## 15. Every generated component must be:

Reusable

Responsive

Accessible

Production-ready

Type-safe where applicable

Cleanly organized

Well documented

Optimized for performance

## Image Asset Policy

- Reuse existing assets whenever possible.
- Do not generate duplicate AI images.
- Only generate new placeholder images if no suitable asset exists.
- Keep all assets inside /src/assets.
- Prefer real company photography when available.

## Component Consistency

Every new homepage section must:

- use the existing spacing system
- use the same heading hierarchy
- reuse existing card styles whenever possible
- reuse existing animations
- avoid introducing new design patterns unless absolutely necessary

## Reusable Component Rule

Before creating a new component:

- Check whether an existing component can be reused.
- Extend existing cards instead of creating new card styles.
- Extend existing buttons instead of creating new buttons.
- Extend existing typography instead of creating new typography.
- Reuse existing spacing tokens.
