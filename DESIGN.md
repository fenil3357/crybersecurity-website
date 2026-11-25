# Design system: Varden (The Survey Route)

The attack surface drawn as surveyed terrain; the engagement is the route across it, each cairn a verified finding.

## Colour (two inks on a stone ground)
| Token | Value | Use |
|---|---|---|
| stone | #e9ece6 | page ground |
| stone-2 | #dfe4dc | alternate bands |
| paper | #f6f8f4 | cards, forms, report sheets |
| granite | #14181a | ink, headings |
| granite-2 / muted | #3a4246 / #586266 | body / secondary text |
| contour | #9aaca3 | contour linework |
| slate / slate-2 | #1e2b33 / #2a3a44 | dark drenched sections (route peak, footer, CTA) |
| trail / trail-bright | #d22b1c / #ff4a33 | reserved for the route, active finding and primary action |

## Type
Funnel Display for headings (650 to 700 weight, tight tracking), Funnel Sans for UI and body. Source Serif 4 for article body only. JetBrains Mono only for coordinates, finding IDs, endpoints and code.

## Components
Survey grid ground, SVG contour terrain (build-time, `lib/contours.ts`), cairn markers, finding cards (map-legend style), ruled service index rows, placeholder slots (dashed, labelled) for client-supplied proof.

## Motion
Hero: layered parallax + pointer spring + route draw-in. Home peak: pinned scroll route (desktop), stacked timeline (mobile, reduced motion). Reveals: CSS `view()` scroll timelines, visible by default. Ease-out cubic-bezier(0.23, 1, 0.32, 1).

## Rules
One primary action everywhere: "Book a scoping call". No eyebrows above headings, no gradient text, no invented proof, no em dashes.
