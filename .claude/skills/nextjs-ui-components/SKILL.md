---
name: nextjs-ui-components
description: Conventions for building React/Tailwind v4 UI in this project (components, sections, client vs server components, styling tokens, responsiveness, accessibility, animation). Use when creating or editing anything in components/ or page sections.
---

# UI component conventions

## Server vs client
- Default to **Server Components**: no directive, no hooks.
- `"use client"` only for leaf components that need `useState` / `useEffect`, event handlers or browser APIs (mobile nav toggle, accordion, tabs, form state, scroll animations). Keep them small, and pass server-rendered content in as `children` or props.
- Never import a server-only data module into a client component just to read it. Pass data down as serialisable props.
- Access `window` / `document` only inside `useEffect` (the pages are prerendered at build time).

## Folder layout
```
components/
  layout/    Header, Footer, MobileNav, Container
  sections/  Hero, ServicesGrid, Industries, Process, CtaBand, FAQ ...
  ui/        Button, Badge, Card, SectionHeading, Placeholder, Icon
lib/
  site.ts       company name, nav, contact, CTA labels (single source of truth)
  services.ts   typed data for the six services
  posts.ts      typed blog data
```
- One component per file, named export or default export matching the file name (PascalCase).
- Typed props (`type Props = {...}`). Allow a `className` prop on layout primitives and merge it with a small `cn()` helper.

## Styling (Tailwind v4)
- Design tokens live in `app/globals.css` under `@theme { --color-*, --font-*, --radius-*, ... }`. Use the generated utilities (`bg-surface`, `text-accent`) instead of hard-coding hex values in components.
- Mobile-first: base classes for phone, then `md:` and `lg:`. Content width goes through a shared `Container` (`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`).
- Use consistent vertical rhythm per section (e.g. `py-20 md:py-28`).
- Respect `motion-reduce:` / `prefers-reduced-motion` for every animation.

## Placeholders (required by the brief)
Use a shared `<Placeholder label="Certification badge" />` component for missing logos, certifications, testimonials and team photos. It should look deliberate (dashed border, subtle label, consistent styling) and never contain invented facts.

## Accessibility checklist
- One `<h1>` per page and a logical heading order.
- Landmarks: `<header>`, `<nav aria-label>`, `<main>`, `<footer>`.
- Interactive elements are real `<button>` / `<a>` elements with visible `focus-visible` rings.
- Icons: decorative ones get `aria-hidden`; icon-only buttons get an `aria-label`.
- Text contrast is at least WCAG AA on dark backgrounds.

## CTA pattern
Primary CTA: "Book a scoping call" (or similar) linking to `/contact/`. Secondary CTA: a soft action such as "View services" or "Read insights". Every page ends with a CTA band. Service pages include an inline enquiry CTA after the "what we test" section.
