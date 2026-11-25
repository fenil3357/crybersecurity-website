@AGENTS.md

# Project: Cybersecurity Company Website Prototype

A clickable, multi-page marketing website prototype for a new **offensive cybersecurity company**. It will be presented to an agency client for review. The quality bar is high: it should look premium and distinctive, not like a generic IT template.

## Business context
- **Client:** offensive security / penetration testing firm.
- **Customers:** fintech, SaaS and other regulated organisations in the **US and Europe**.
- **Value:** find exploitable vulnerabilities, strengthen security posture, produce **audit and compliance evidence**.
- **Growth channels:** SEO/inbound (authority content, enquiries) and B2B outbound (booked meetings). Every page should support both: rankable content plus clear enquiry and booking CTAs.
- **Audience:** technical buyers (CISO, security and engineering leads) **and** non-technical decision-makers (CEO, founder, compliance, risk). Pair technical depth with plain-language business outcomes.

## Services (exactly six)
1. Vulnerability Assessment & Penetration Testing (VAPT)
2. Web Application Penetration Testing
3. Mobile Application Penetration Testing (iOS & Android)
4. API Security Review (REST, GraphQL, SOAP)
5. Network Penetration Testing (external & internal)
6. Thick-Client Penetration Testing (Windows, macOS, Java, .NET)

## Required pages
Home · About Us · Services (overview + six service pages) · Insights/blog (listing + article template) · Contact ("Book a scoping call", the conversion target). The full sitemap, page blueprints and CTA system live in the `security-site-strategy` skill.

## HARD CONTENT RULES (never break)
- **Do not invent** certifications (CREST, OSCP, ISO 27001, SOC 2 attestations of the company, etc.), client names or logos, testimonials, case-study results, statistics, years in business, team size, awards, or security guarantees ("100% secure", "guaranteed compliance").
- Use **clearly labelled placeholders** instead, e.g. `[Certification badge placeholder]`, `[Client testimonial — pending]`, `[Logo]`. Placeholders should look intentional and well designed, not broken.
- Say "supports your SOC 2 / ISO 27001 / PCI DSS / DORA audit evidence", **not** "makes you compliant".
- The company name is a placeholder until the client confirms one. Keep it in a single constant (`lib/site.ts`) so it can be swapped in one place.
- Use British/international English consistently (organisation, authorisation), as the brief does.

## Tech stack
- **Next.js 16 (App Router, Turbopack)**, React 19, TypeScript, **Tailwind CSS v4** (CSS-first config in `app/globals.css` via `@theme`; there is no `tailwind.config.js`).
- **Motion** (`motion/react`) is the project's **only** animation library; CSS transitions handle simple hovers. No GSAP, no Lenis or smooth-scroll hijacking. **Lucide** (`lucide-react`) is the only icon set. Bespoke security visuals are SVG/HTML drawn in code.
- **Static export only:** `next.config.ts` sets `output: "export"`, `images.unoptimized`, `trailingSlash: true`. No server. See the `nextjs-static-export` skill for what is and isn't allowed.
- Deploy target: Vercel (static). Git remote: `origin` → GitHub, branch `main`.

## Project structure (planned)
```
app/                 routes (page.tsx / layout.tsx per route)
  page.tsx           Home
  about/page.tsx
  services/page.tsx  + services/[slug]/page.tsx (static params)
  insights/page.tsx  + insights/[slug]/page.tsx (static params)
  contact/page.tsx
components/          shared UI (layout/, sections/, ui/)
lib/                 site config, services data, blog data, helpers
public/              static assets (svg, images)
```
Content (services, articles, nav) lives in typed data files under `lib/`, never hard-coded inside multiple pages.

## Code conventions
- Server Components by default. Add `"use client"` only to small leaf components that need state, effects or browser APIs (mobile menu, animations, form UI).
- Use `next/link` for internal links, `next/font` for fonts, and the `metadata` / `generateMetadata` exports for SEO on every page.
- Mobile-first responsive Tailwind. Check every layout at ~375px, ~768px and ≥1280px.
- Accessibility: semantic landmarks, one `h1` per page, visible focus states, AA contrast, `alt` text, `prefers-reduced-motion` respected.
- Keep components small and reusable (Section, Container, Button, CTA band, ServiceCard).

## Commands
- `npm run dev`: dev server at http://localhost:3000
- `npm run build`: static build to `/out` (must pass before any commit)
- `npm run lint`: ESLint

## Skills: who owns which decision
Use the skill that owns the decision, and don't let two skills decide the same thing.

| Decision | Owner skill | Notes |
|---|---|---|
| What goes on a page, section order, personas, CTA placement, forms, SEO keywords | `security-site-strategy` | Read it before planning any page |
| Every visible word: headings, body, CTAs, form text, meta titles, articles | `conversion-copy` | Overrides any copy advice in other skills |
| Visual direction, design system, typography, colour, layout, critique, audit, polish | `impeccable` | Mode: **Persuade** for Home, Services, About, Contact; **Read** for Insights and articles. It owns `PRODUCT.md` and `DESIGN.md` |
| Where scroll does what: feeling curve, peak, pin/reveal/parallax/pan/kinetic/pointer/drift | `scroll-story` | Plan the scroll score before building a marketing page |
| How a single motion is built: easing, duration, springs, interruption, reduced motion | `animate` | Use it instead of impeccable's `animate` command. Its tool is Motion or CSS (see stack) |
| Groups moving together: staggers, hero entrance sequence, step transitions | `choreograph` | |
| Frame rate, jank, which properties to animate | `animation-performance` | |
| Reviewing motion code before showing the client | `review-animations` | |
| Next.js routing, static export, metadata, dynamic routes | `nextjs-static-export` | |
| Component structure, server vs client, Tailwind tokens, accessibility basics | `nextjs-ui-components` | Tokens must come from impeccable's DESIGN.md once it exists |
| Lint, build and content-honesty checks | `verify-build` | |

**Conflict rules:**
1. The brief's honesty rules (above) beat every skill.
2. `security-site-strategy` beats impeccable on *what content* a page has; impeccable beats everything on *how it looks*.
3. Placeholders: impeccable and conversion-copy forbid bracket text in copy. Missing client assets go only in the designed `<Placeholder>` component slots.
4. impeccable's design-detector hook runs automatically after UI edits (and in a deeper pass at the end of the turn). Fix what it reports rather than ignoring it. To silence a rule on purpose, use `.claude/skills/impeccable/scripts/impeccable hooks ignore-rule <id>` with a stated reason.

## Workflow (follow in order for new work)
1. **Context (once):** run impeccable `init` to write `PRODUCT.md` from this file plus the strategy skill. Ask the user only what's missing.
2. **Direction before code:** propose 2–3 genuinely different visual directions (palette, type pairing, hero concept, signature motion idea) through impeccable's new-work flow. The user picks one, then impeccable writes `DESIGN.md`, and the tokens go into `app/globals.css` `@theme`.
3. **Plan the page:** the strategy blueprint, copy drafted with conversion-copy, and the scroll score from scroll-story.
4. **Build** the shared layout and components first, then pages, Home first.
5. **Look at it:** after each page, take screenshots at 390 / 768 / 1440 (`.claude/skills/impeccable/scripts/impeccable shot <url-or-page>` or the Chrome browser tools against `npm run dev`). Fix what you see before moving on. Code that compiles is not done; code that looks right at all three widths is.
6. **Review:** impeccable `critique` and `audit`, then `review-animations` and `verify-build` before every commit or demo deploy.

## General rules
- Before writing Next.js code, check the bundled docs in `node_modules/next/dist/docs/` (see AGENTS.md). APIs differ from older versions (e.g. `params` is a Promise).
- After changes, run `npm run lint` and `npm run build` and fix all errors.
- Commit or push only when asked. The GitHub token lives in `.git/repo-credentials` (repo-local credential store). Never print it, move it or copy it anywhere else.
