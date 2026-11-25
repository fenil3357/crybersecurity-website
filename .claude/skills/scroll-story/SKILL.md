---
name: scroll-story
description: Plan and build scroll-driven storytelling for this Next.js site, including the page's feeling curve, its one peak moment, and which scroll device each section uses (pin, reveal, kinetic, parallax, pan, drift, pointer, flow-in), implemented with Motion (motion/react) and CSS sticky. Use when planning a page's scroll experience, building a hero with depth, pinned or scroll-linked sections, scroll reveals, parallax, or when a page feels flat, templated or "like every other section".
---

# Scroll storytelling (Next.js + Motion)

Adapted from scroll-craft (MIT, © 2026 Nate Herk, github.com/nateherkai/scroll-craft). Kept: its scroll thinking (device variety, feeling curve, one peak, pacing). Dropped: video scrubbing, AI image generation, 3D worldflights and its vanilla engine. Here everything is built with **Motion** (`motion/react`), **CSS `position: sticky`** and SVG/HTML visuals drawn in code.

**Division of labour:** this skill decides *where scroll does what*. Emil's `animate` decides curves and durations for each motion. `choreograph` handles groups and staggers. `animation-performance` keeps it at 60fps. `review-animations` does the final review. impeccable owns the overall visual direction.

## 1. Plan before building: the scroll score
For each marketing page (mainly Home and service pages), write a short plan in a code comment at the top of the page file, or in `docs/scroll-score.md`:

```
#  section          feeling      device        why it moves
1  hero             recognition  parallax+pointer  layered attack-surface visual, headline readable at rest
2  problem          unease       flow-in       short, calm
3  how-we-test      clarity      PIN (peak)    scope → recon → exploit → report → retest traced as one attack path
4  services         breadth      pan / reveal  six disciplines, each lands whole
5  industries       recognition  flow-in       regulations named plainly
6  close            resolve      flow-in       one action, nothing competing
```

Rules:
- **Variety:** at least 4 device families per long page, and never the same device in two adjacent sections.
- **One peak per page.** It gets the most scroll room, the best visual, and a quieter section before it. A page with three peaks has none.
- **The peak passes the tell-someone test.** Write the sentence a visitor would say: "the site where scrolling traced an attack path through a network until the report popped out".
- **The ending resolves.** The last screen is the CTA band standing still with content on it, not a fade to empty.
- **Administrative content stays flat:** FAQ, legal, contact details, blog listings and article body use plain flow sections. Articles are a reading surface, so no scroll effects inside them beyond a reading-progress bar.
- **Total budget:** Home is about 8–12 viewport-heights. A pinned section is 2–3.5 viewport-heights of travel.

## 2. The device kit

| Device | Reads as | Use for | Build with |
|---|---|---|---|
| **pin** | an argument unfolding | process steps, attack-path walkthrough, "what a finding looks like" | outer `<section style={{height:'300vh'}}>` with a `sticky top-0 h-screen` stage; `useScroll({ target, offset:['start start','end end'] })`; map `scrollYProgress` to step states with `useTransform` |
| **reveal** | a change of state | the moment "vulnerable" becomes "fixed", a report revealing | `clip-path: inset()` driven by progress; use it big, not on small elements; at most one `iris` (circle) per page |
| **kinetic** | a headline assembling | one hero or section headline | split by **lines** (words for a short punch; never characters), mask-up stagger 40–80ms; give the mask room for descenders; re-split after `document.fonts.ready` |
| **parallax** | depth | hero layers (grid, nodes, foreground UI) | `useTransform(scrollYProgress, [0,1], [a,b])` on `y`; subtle, at most ~120–200px total travel |
| **pan** | breadth | the six services as a lineup | sticky stage plus horizontal `x` translate from progress; only for peers, never for a hierarchy; on mobile it becomes a vertical stack |
| **drift** | one continuous place | page ground shifting slightly between dark tones | interpolate a CSS variable between 3–5 close colour stops, all in one theme family; if several short sections compete, use hard per-section grounds instead |
| **pointer** | presence | hero depth, one spotlight surface, the primary CTA | spring-smoothed pointer position (`useSpring`) into CSS vars; tilt 5–9°, magnet 0.2–0.35 on the primary CTA only; gate with `(hover:hover) and (pointer:fine)` |
| **flow-in** | calm, ordinary | most sections | once-only reveal on entry (`whileInView` with `viewport={{ once:true, margin:'-12% 0px' }}`): opacity 0→1 plus rise of about 12–16px, ~500–650ms ease-out, children staggered 30–80ms. Never re-hide on scroll-up |

**Not used:** animated statistic counters (we have no real numbers to count), video scrub, scroll-jacking or smooth-scroll libraries (native scroll only), carousels on timers.

## 3. Hero with depth
- A premium hero needs **separate layers** that move at different rates: for example a background grid or topology, a mid-layer of network nodes and attack-path lines, and a foreground UI fragment (a finding card, terminal output, report excerpt). Depth comes from different speeds, overlap and blur or opacity falloff, not from one image with a fade.
- The headline stays fully readable at rest and at every scroll position. Text never sits on a busy layer without a scrim or a quiet zone.
- **The static state must be beautiful.** Reduced motion and no-JS both get the same composition, frozen.
- **Mobile gets its own composition:** fewer layers, no pointer effects, smaller travel. Don't shrink the desktop scene.

## 4. Cybersecurity visual language (drawn in code)
Visuals are SVG and HTML built in the repo, never stock "hacker" imagery. Good subjects: network topology with an attack path lighting node to node; an API request/response with an authorisation flaw highlighted; a finding card (severity, CVSS-style score as a placeholder, affected endpoint, fix); a report page preview; a retest diff (vulnerable → fixed).
**Avoid:** hooded figures, padlocks and shields as hero art, binary or matrix rain, neon-green-on-black terminals as decoration, globe-with-arcs clichés, and monospace used as decoration (monospace is for real code, endpoints and data).

## 5. Implementation rules
- Scroll components are small **client components** (`"use client"`) wrapping server-rendered content passed as children. Pages stay Server Components.
- Import from `motion/react`. Use `useScroll`, `useTransform`, `useSpring`, `useMotionValueEvent`, `useReducedMotion`, `motion.*` and `whileInView`.
- Animate **only `transform`, `opacity`, `clip-path` and `filter`**. Never animate layout properties (`top`, `height`, `width`, `margin`). See `animation-performance`.
- **Reduced motion:** with `useReducedMotion()` true, pinned sections render as normal stacked sections with every step visible, parallax is off, kinetic text appears whole, and flow-in is opacity only.
- **Touch:** pointer devices are off, and pan becomes a vertical list or a native horizontal scroll with snap.
- One `useScroll` target per section, so sections don't share a global progress.
- Nothing essential (copy, CTAs, links) is reachable only through an animation. All content is in the DOM and readable without JS (prerendered by static export).

## 6. Verify (the feel check)
After building, take screenshots at several scroll positions for desktop (1440), tablet (768) and mobile (390), and check:
1. Is the headline readable in every frame?
2. Are there empty or broken frames mid-pin?
3. Is the peak the largest visual change, with a quiet section before it?
4. Does the end resolve on the CTA?
5. Does reduced-motion mode still look designed? (Emulate `prefers-reduced-motion`.)

Scroll once top to bottom and write one word per section for what you felt. Compare with the planned feeling column, and wherever they disagree, fix the page, not the plan. Then run `review-animations` on the motion code.
