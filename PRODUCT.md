# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Next.js 16 (App Router) with static export (`output: "export"`), React 19, TypeScript, Tailwind CSS v4, Motion (`motion/react`), Lucide icons. Deployed as a static site (Vercel). No server: forms are front-end only in this prototype. Confirmed with the user.

## Users
The site is a clickable prototype that an agency presents to its client, a newly launched offensive-security firm. The visitors it is designed for are that firm's buyers at fintech, SaaS and other regulated organisations in the United States and Europe:
- **CISO / Head of Security**: judging whether testing goes deeper than a scanner and whether the testers are senior.
- **CTO / Engineering lead**: judging disruption, reproducibility of findings and how actionable the fixes are.
- **Compliance / GRC lead**: needs a report an auditor accepts (SOC 2, ISO 27001, PCI DSS v4, DORA, NIS2, HIPAA).
- **CEO / Founder of a scale-up**: needs to unblock an enterprise deal, security questionnaire or funding diligence, quickly and at a known cost.

They arrive either from search (inbound/SEO) or from a sales link sent during outbound outreach, often straight onto a service page.

## Product Purpose
Communicate the firm's offensive-security expertise, build trust with technical and non-technical decision-makers, and turn visits into booked scoping calls. It must also lay the groundwork for SEO (service pages and Insights articles) and for outbound (service pages that stand alone as landing pages). Success for the prototype: the agency's client sees a premium, distinctive site that clearly understands their business and buyers.

## Positioning
Manual-first offensive testing for fintech and SaaS: human testers find the exploitable issues scanners miss (authorisation, business logic, chained attack paths), explain them so engineers can fix them, retest the fixes, and hand over evidence that auditors and enterprise customers accept.

## Operating Context
- **Buying moments:** SOC 2 Type II audit windows, ISO 27001 certification, PCI DSS v4 requirement 11.4 testing, DORA threat-led testing in EU finance, NIS2 obligations, HIPAA, customer security questionnaires, enterprise procurement, funding or M&A due diligence, major releases.
- **An engagement:** scoping call → rules of engagement and testing window → manual testing → report (executive summary, technical findings with reproduction steps and fixes) → remediation by the client → retest.
- **Standards referenced:** OWASP WSTG/ASVS, OWASP MASVS/MASTG, OWASP API Security Top 10, PTES, NIST SP 800-115, OSSTMM, CVSS.

## Capabilities and Constraints
- **Six services, exactly:**
  1. Vulnerability Assessment & Penetration Testing (VAPT)
  2. Web Application Penetration Testing
  3. Mobile Application Penetration Testing (iOS, Android)
  4. API Security Review (REST, GraphQL, SOAP)
  5. Network Penetration Testing (external, internal)
  6. Thick-Client Penetration Testing (Windows, macOS, Java, .NET)
- **Required pages:** Home, About, Services (overview + per-service pages), Insights (listing + article), Contact / book a scoping call.
- **Confirmed operating facts (may be stated):** manual-first testing; retesting of fixes is included; an NDA can be signed before scoping; the firm serves the US and Europe.
- **Must work responsively** on desktop, tablet and mobile, load fast, and scroll smoothly without jank.
- **Copy rule from the user:** no em dashes anywhere in site copy.
- **Undecided (client to supply; shown only as designed placeholder slots):** final company name, logo, brand guidelines, certifications, testimonials, client logos, team bios, pricing, exact timelines in days, office addresses, phone numbers.

## Brand Commitments
- **Placeholder name: "Varden".** Coined for the prototype (collision-checked on 2026-11-25) and held in `lib/site.ts`. A *varde* is a Nordic stone cairn marking the safe route across difficult terrain. To be replaced when the client confirms a name.
- English with British/international spelling (organisation, authorisation), as in the brief.

## Evidence on Hand
None yet. There are no certifications, testimonials, client references, case studies, statistics, awards or years in business. These must **never be fabricated**. Security guarantees ("100% secure", "guaranteed compliant") are forbidden. Sample findings and sample reports may appear only when clearly labelled as samples.

## Product Principles
1. **Proof by artefact, not by claim.** Show what the work produces (findings, reports, attack paths, methodology) instead of asserting reputation.
2. **Two readers, one sentence.** Every claim pairs the technical fact with its business consequence.
3. **Honest by construction.** Missing proof gets a designed placeholder slot, never a fake.
4. **Every page can close.** Each page, including a service page reached cold from outreach, carries a clear path to booking a scoping call.

## Accessibility & Inclusion
WCAG 2.2 AA: contrast, keyboard navigation, visible focus, semantic structure, and `prefers-reduced-motion` honoured for all scroll and motion effects.
