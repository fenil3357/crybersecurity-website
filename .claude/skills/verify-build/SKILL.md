---
name: verify-build
description: Verify the site after changes. Runs lint, typecheck and the static export build, then checks the generated /out routes. Use after finishing any feature, before committing, or when asked to check, test or verify the site.
---

# Verify the site

Run these from the project root and fix every error before reporting done:

1. `npm run lint`: ESLint must report no errors.
2. `npm run build`: this also type-checks. Confirm that:
   - it compiles with no errors;
   - every route in the route table is `○ (Static)` or `● (SSG)` (none dynamic);
   - an `/out` folder is produced.
3. Spot-check the output: each expected route has an `index.html`, e.g. `out/about/index.html`, `out/services/<slug>/index.html`, `out/insights/<slug>/index.html`, `out/contact/index.html`.
4. Optional visual check: `npx serve out` (or `npm run dev`), then open the pages and check them at mobile (375px), tablet (768px) and desktop (1280px+) widths. Make sure navigation links work and there are no console errors.
5. Content audit: grep for invented claims before committing. Words like `certified`, `CREST`, `OSCP`, `ISO`, `guarantee`, `100%`, `trusted by`, `clients` or numeric stats must appear only as clearly labelled placeholders or as neutral framework references (e.g. "supports SOC 2 audit evidence").

Report results honestly: list any failures with their output.
