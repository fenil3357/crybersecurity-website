---
name: security-site-strategy
description: Business and UX strategy for this offensive-security firm's website, covering buyer personas, buying triggers (SOC 2, ISO 27001, PCI DSS v4, DORA, NIS2, HIPAA, security questionnaires, enterprise deals), page blueprints for Home, About, Services overview, per-service pages, Blog and Contact, honest trust signals for a new firm with no testimonials, the CTA and conversion system, the scoping-form design, and the SEO keyword map. Use before planning or building any page, section, navigation, form or blog content, and when deciding what goes on a page and in what order.
---

# Security site strategy

This is the **what and why** of every page. `conversion-copy` decides how it's worded, impeccable decides how it looks, and `scroll-story` decides how it moves. The research behind this skill (11 leading firms with URLs) is in [references/research.md](references/research.md). Read it when a decision needs evidence.

## Positioning
- **Who:** an offensive-security firm doing manual-first penetration testing for **fintech, SaaS and regulated organisations** in the **US and EU**.
- **Promise:** find the exploitable issues scanners miss, explain them so engineers can fix them, and hand over **evidence auditors and enterprise customers accept**.
- **Where we beat the category:** most competitor sites are either dense enterprise brochures with stock photos and logo walls, or quiet research boutiques. We aim for the **clarity of a research boutique with the conversion paths of a product company**, using **real artefacts as visuals** (finding cards, report excerpts, attack-path diagrams) instead of stock imagery.

## Personas, and what each page must answer
| Persona | Question in their head | Answer with |
|---|---|---|
| CISO / Head of Security | "Is this deeper than a scan, and are the testers senior?" | methodology per service, a sample finding, standards, researcher profile slots, research posts |
| CTO / Engineering lead | "Will it disrupt us, and can my team act on the findings?" | rules of engagement, testing windows, reproduction steps and fix guidance, retest, a findings walkthrough call |
| Compliance / GRC | "Will my auditor accept the report?" | "audit-ready report", framework mapping, a letter-of-attestation placeholder, dates and scope stated |
| CEO / Founder (scale-up) | "Does this unblock the deal or questionnaire, and how fast and how much?" | plain outcomes, timeline, scoping-to-quote speed, cost drivers explained |

**Buying triggers to name on the site:** SOC 2 Type II audits, ISO 27001 certification, PCI DSS v4 req. 11.4 (annual and after significant change), DORA threat-led testing (EU financial entities), NIS2 Art. 21, HIPAA, customer security questionnaires and enterprise procurement, funding or M&A due diligence, major releases and architecture changes. Regulatory specifics come from the research and should be checked against the primary texts. Phrase them as "supports" or "provides evidence for", never as a guarantee.

## Sitemap and navigation
```
/                         Home
/services/                Services overview (6 cards + "not sure which test?" guide)
/services/<slug>/         ×6 service pages (SEO landing pages)
/about/                   About
/insights/                Blog listing (route name "insights" reads as more authoritative)
/insights/<slug>/         Article
/contact/                 Book a scoping call (form + what happens next)
```
- **Header:** logo placeholder · Services (mega-menu listing the 6 with one-line descriptions) · Industries (anchor to a Home section for now) · About · Insights · **[Book a scoping call]** as the primary button, always visible and sticky.
- **Footer:** services list, company links, insights, contact, a security.txt / responsible-disclosure link (placeholder page OK), legal row. No invented addresses or phone numbers.
- Slugs: `vulnerability-assessment-penetration-testing`, `web-application-penetration-testing`, `mobile-application-penetration-testing`, `api-security-review`, `network-penetration-testing`, `thick-client-penetration-testing`.

## Page blueprints
**Home** (Persuade mode; this page carries the scroll-story peak)
1. **Hero:** h1 = category + buyer; subline = manual testing + outcome; primary CTA plus "See a sample report"; a layered visual built from real artefacts (attack path / finding card).
2. **Why manual testing:** the scanner gap in plain words (business logic, authorisation, chained issues), short.
3. **Services:** six disciplines, each with what's tested and the outcome, linking to its page.
4. **How an engagement runs (the peak):** Scope → Test → Report → Retest, with what the client does and gets at each step.
5. **What you receive:** a sample finding card and report excerpt (severity, affected asset, PoC summary, fix, retest status), all clearly sample data.
6. **Industries and frameworks:** fintech, SaaS, healthtech and other regulated sectors, each paired with its trigger (SOC 2, PCI DSS, DORA, HIPAA, NIS2).
7. **Standards we test against:** OWASP WSTG/ASVS, MASVS/MASTG, OWASP API Top 10, PTES, NIST SP 800-115, CVSS. A factual list (these are public standards, not certifications).
8. **Credentials slot:** a designed `<Placeholder>` area for certifications and client logos, labelled as pending client supply. Never fill it with fake badges.
9. **Latest insights:** 3 article cards.
10. **FAQ:** 5–6 buyer questions.
11. **Closing CTA band.**

**Service page** (×6, same anatomy, different content; this is the main SEO surface)
1. Hero: outcome h1 with the service keyword, a one-line who-it's-for, primary CTA + "Get a testing quote".
2. The risk in plain terms: what attackers abuse in this asset type.
3. **What we test:** asset types and vulnerability classes as a scannable grid. For example, API: REST/GraphQL/SOAP, BOLA/IDOR, broken auth, excessive data exposure, rate limiting, mass assignment, business logic.
4. **Methodology:** 3–5 phases named after the relevant standard.
5. **Sample finding card:** one realistic, clearly sample finding for this asset type.
6. **Deliverables:** executive summary, technical report, reproduction steps, fix guidance, retest results, attestation-letter placeholder.
7. **Timeline:** typical phases (prep → testing → reporting → retest) without promising exact days unless the client confirms them.
8. **Inline CTA** after the methodology or deliverables.
9. **Compliance relevance:** which frameworks this test supports evidence for.
10. **FAQ** (6–8) → **related services** → **closing CTA band.**
11. Metadata plus Service and FAQPage JSON-LD and breadcrumbs.

**Services overview:** a short intro, six rich cards, and a **"Which test do you need?" guide** that maps a situation to a service (e.g. "Launching a public API" → API Security Review; "PCI DSS 11.4" → Network + Web). Then process recap and CTA.

**About:** the founding intent (why manual-first, why fintech/SaaS), the approach as principles backed by practice (manual-first, a named-tester placeholder per engagement, QA review before delivery, plain-language reporting, a single point of contact), mission, researcher-profile placeholders, a data-handling and confidentiality section (NDA, encrypted report delivery, data-retention policy as a client-confirm placeholder, US/EU), responsible disclosure, and CTA. No invented history, headcount or years.

**Insights listing:** featured article, a category filter (Compliance · Application security · API · Mobile · Network · Research, applied client-side), cards with title, excerpt, category, reading time and date, and a newsletter or "get new research" sign-up (front-end only).

**Article:** a reading layout (65–75ch measure), TL;DR, table of contents on desktop, code blocks and tables, author placeholder, related service CTA (an inline box tied to the topic), related articles, Article JSON-LD and a reading-progress bar.

**Contact / Book a scoping call:** two columns, a form on one side and "what happens next" plus the topics covered on the call on the other.
- **Step 1 fields (5–6):** name, work email, company, role, services (multi-select chips), main driver (SOC 2 / ISO 27001 / PCI DSS / DORA / NIS2 / HIPAA / customer request / release / funding / other).
- **Step 2 (optional, after step 1):** approximate scope (number of apps/APIs/IPs, mobile platforms), environment, target date, region (US/EU), notes.
- Front-end only (static export), with a client-side validated success state that says what happens next. Offer "Prefer email? hello@company.example".

## Conversion system
- **Primary CTA everywhere:** "Book a scoping call" → `/contact/`, with identical wording site-wide.
- **Secondary CTAs:** "See a sample report" (opens a sample-report preview section or a soft-gated download placeholder) and "Get a testing quote" (also goes to `/contact/` with the service preselected via `?service=` read client-side).
- **Placement:** sticky header button; hero; an inline CTA mid-page on every service page; a closing CTA band on every page; a related-service CTA inside articles; a mobile sticky bottom bar on service pages.
- **Outbound support:** service pages and compliance sections must work as **landing pages for sales links** ("here's our API testing approach"). Each must stand alone with its own CTA.
- **Friction reducers near the form:** what the call covers, who you'll talk to (placeholder), confidentiality ("NDA available before scoping"), no-obligation wording.

## Honest trust signals (allowed)
Named public standards; a sample finding and sample report (labelled as sample); a clear process and rules of engagement; deliverables listed; data handling and NDA; a responsible-disclosure policy; published insights. **Client-confirm placeholders** (designed slots, never stated as fact): retest policy and window, certifications, client logos, testimonials, team bios, timelines in days, pricing.
**Never:** stats, "trusted by", logo walls, ratings, awards, or "X years of experience".

## SEO map
- One primary keyword cluster per service page: "vulnerability assessment and penetration testing", "web application penetration testing", "mobile application penetration testing" (iOS/Android), "API penetration testing" (GraphQL, REST), "network penetration testing" (external/internal), "thick client penetration testing".
- **Compliance intent** (future landing pages, for now sections and articles): SOC 2 / ISO 27001 / PCI DSS / DORA / NIS2 / HIPAA penetration testing.
- **Seed articles for the prototype** (3–6 written, the rest as cards): "Does SOC 2 require a penetration test?", "PCI DSS v4 requirement 11.4 explained for SaaS", "DORA threat-led testing vs a standard pentest", "How to scope a penetration test and what drives cost", "BOLA and IDOR in fintech APIs", "GraphQL security testing checklist", "Answering 'when was your last pentest?' in security questionnaires", "How to read a pentest report".
- Every page: a unique `title` (≤60 characters) and `description` (≤160), one h1 containing the keyword, descriptive slugs, internal links (service ↔ related articles ↔ services), `sitemap.ts` and `robots.ts`, and Open Graph metadata.

## Visual direction guardrails (for impeccable)
Premium means editorial clarity, a restrained palette with one strong accent, dense but readable type, and **real security artefacts drawn in code** as the imagery. Avoid stock photos, hooded hackers, padlocks or shields, matrix rain, neon green on black, glowing globes, logo walls and unexplained stat blocks.
