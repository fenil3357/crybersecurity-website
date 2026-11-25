# Research: how leading pentest firms structure their websites

Compiled 2026-11-25 from pages of 11 firms: Bishop Fox, Trail of Bits, Doyensec, Cure53, Cobalt, Rhino Security Labs, NCC Group, SEC Consult, Include Security, Praetorian and Synack. Bugcrowd's pentest pages returned 404. The fetches returned text only, so colour and type observations are inferred. Patterns are extracted here, not copied text.

## 1. Personas and triggers
| Persona | Cares about | What the site must show |
|---|---|---|
| CISO / Head of Security | Depth beyond scanners, tester seniority, attack chains, findings that hold up with the board and auditors | Methodology, sample finding, named researchers, research output |
| Engineering lead / CTO | Low disruption, reproducible findings, fix guidance, fast retest, fit with dev workflow | Repro steps, remediation, retest SLA, findings walkthrough call |
| Compliance / GRC | A report the auditor accepts, an attestation letter, framework mapping, dates | "Audit-ready report + letter of attestation", framework list |
| CEO / founder at a scale-up | Unblocking an enterprise deal or questionnaire, cost, speed to start | Clear timeline, scoping-to-quote speed, plain-language outcomes |

**Triggers seen on the sites:**
- Bishop Fox's app-pentest FAQ lists PCI DSS, HIPAA, SOC 2, GDPR, ISO 27001 and DORA as drivers (https://bishopfox.com/services/application-penetration-testing).
- SEC Consult puts NIS2, DORA and the Cyber Resilience Act in its top navigation (https://sec-consult.com/).
- Cobalt names PCI, SOC 2 and HIPAA (https://www.cobalt.io/pentest).
- Praetorian lists GLBA, NYDFS, HIPAA and PCI-DSS (https://www.praetorian.com/).

**From background knowledge, to verify against primary texts:**
- PCI DSS v4 Req. 11.4 requires an internal and external pentest at least annually and after significant change.
- DORA requires threat-led penetration testing (TLPT, TIBER-EU style) roughly every 3 years for significant financial entities.
- NIS2 Art. 21 requires firms to assess how well their security controls work.
- SOC 2 and HIPAA don't strictly mandate a pentest, but auditors expect one.

**Business triggers:** security questionnaires, enterprise procurement, funding due diligence, major releases or architecture changes, M&A.

## 2. Page structures
**Home (common order):** hero (short H1 + primary CTA), proof strip (stats or logos), service grid, approach or methodology, research and blog cards, open-source tools, closing CTA band, footer. Seen at Bishop Fox, Praetorian, Synack and NCC Group. Trail of Bits leads with research counters and three paths: services, the work, the blog (https://www.trailofbits.com). Cure53 is a single page where the publications list is the largest section (https://cure53.de).

**Per-service page.** The best examples are Bishop Fox app-pentest and Cobalt API pentest (https://www.cobalt.io/services/application-security/api-pentest). Order:
1. Hero: an outcome headline plus "Get a quote"
2. Problem framing (scanners miss authorisation and business-logic flaws)
3. What's tested: asset types (REST/SOAP/GraphQL, gateways, microservices) and vulnerability classes (BOLA, broken auth, injection, rate limiting, business logic)
4. Methodology: 3–4 named phases
5. **A sample finding card**: Cobalt shows a CVSS 9.3 JWT bypass with PoC, impact and fix
6. Deliverables: executive and technical reports, attack chains, severity scale, retest
7. Timeline: Bishop Fox gives 1–2 weeks prep, 1–3 weeks testing, 1–2 weeks reporting
8. A named-expert bio
9. Resources: methodology PDF, datasheet
10. FAQ: 6–12 questions on scanning vs. pentesting, timeline, prep, frequency, compliance, deliverables
11. Closing CTA

Bishop Fox ships Service JSON-LD plus FAQ and breadcrumb schema.

**About:** founding story and experience (Include Security: every tester has at least 5 years of app-hacking experience), how they work (QA before delivery, a technical project manager as point of contact, report about a week after testing — https://includesecurity.com/), team with PGP keys (Cure53), and locations in the US and EU (Doyensec: San Francisco and San Marino, https://doyensec.com).

**Contact:** usually a short form.
- Rhino: first name, last name, email, phone, "How can we help?", country; button "Contact a Security Expert" (https://rhinosecuritylabs.com/contact/).
- Include Security: name, email, phone, message.
- Doyensec and Cure53: email and phone only, no form.

No public multi-field scoping form was found. The quote pages for Rhino and Cobalt returned 404.

## 3. Honest trust signals for a new firm
- **Named standards per service:** OWASP WSTG and ASVS (web), MASVS/MASTG (mobile), OWASP API Top 10 (API), PTES, NIST SP 800-115 and OSSTMM (network and VAPT), CVSS v4 for severity.
- **A redacted sample finding on each page, plus a downloadable sample report.** Rhino links an "Example Pentest Report".
- **A retest policy stated plainly.** Cobalt promises free retesting for 6–12 months and a 7-day retest SLA. Pick a policy you can honour.
- **Manual-first wording.** Rhino says "manual, deep-dive engagements". Bishop Fox frames the OWASP Top 10 as a baseline to go beyond.
- **A transparent process and timeline.** Write out the rules of engagement, testing windows, emergency stop contact and critical-finding escalation.
- **Data handling.** Cure53 states NDA and GDPR-compliant agreements and offers PGP and S/MIME. Add EU/US data residency, evidence retention and destruction periods, and encrypted report delivery.
- **Named-researcher placeholders**, plus security.txt and a responsible-disclosure policy.
- **Published research and advisories.** SEC Consult has a dated Vulnerability Lab, Trail of Bits shows publication counters, Cure53 publishes reports with client permission. Even 2–3 good posts help.
- **Avoid:** stats, logos, NPS or "trusted by" claims you can't back up.

## 4. CTAs and conversion
- **Primary CTAs:** "Get in touch", "Get a quote", "Contact Sales", "Request a Demo" (platform firms). The CTA sits in the header and repeats in the hero and the closing band.
- **Secondary CTAs:** methodology PDF, datasheet, research or industry report downloads (often gated), "Read the blog", "Explore the work".
- **Recommended for this firm:** primary **"Book a scoping call"**; secondary **"See a sample report"** (soft-gated) and "Get a testing quote".
- **Scoping fields (synthesised):** name, work email, company, role; services (multi-select); approximate scope (apps/APIs, roles, endpoints, IPs, mobile platforms); environment (production or staging); driver (SOC 2, ISO 27001, PCI, DORA, NIS2, HIPAA, customer request, release, funding); target deadline; region (US/EU); notes. Keep the first step to 5–6 fields.

## 5. SEO keyword and intent map
| Service | Core cluster | Commercial modifiers |
|---|---|---|
| VAPT | vulnerability assessment and penetration testing, VAPT services, vulnerability assessment vs penetration testing | cost, provider, report |
| Web app | web application penetration testing, web app pentest, OWASP penetration testing | SaaS, checklist, cost |
| Mobile | mobile application penetration testing, iOS / Android app pentest, MASVS testing | fintech app, banking app |
| API | API penetration testing, GraphQL security testing, REST API pentest, OWASP API Top 10 | SOAP, API security assessment |
| Network | external / internal network penetration testing, infrastructure pentest | PCI 11.4, frequency |
| Thick client | thick client penetration testing, desktop application security testing, .NET / Java app pentest | Electron |
| Compliance | SOC 2 / ISO 27001 / PCI DSS / NIS2 / HIPAA penetration testing, DORA TLPT | requirements, report |

**Blog topics:**
1. Does SOC 2 require a penetration test? What auditors actually check
2. PCI DSS v4.0 Req. 11.4 explained for SaaS payment flows
3. DORA TLPT vs. a standard pentest: what EU fintechs need
4. NIS2 security testing obligations for SaaS suppliers
5. How to scope a pentest, and what drives cost
6. BOLA and IDOR in fintech APIs
7. GraphQL security testing checklist
8. Answering "When was your last pentest?" on security questionnaires
9. Pentesting before a funding round or enterprise deal
10. Reading a pentest report: CVSS, risk and fix priority

## 6. Visual patterns
- **Premium sites look editorial and text-led:**
  - Trail of Bits: a catalogue of research cards (author, year, tags), ⌘K search, light/dark assets.
  - Doyensec: minimal, with an icon grid.
  - Cure53: "No cookies, No trackers, No ads" stated as a brand value.
  - Bishop Fox: dark, high-contrast, abstract mechanical art rather than hacker imagery.
- **Generic signals:** stock photos (NCC Group uses Getty images, SEC Consult a photo of Earth), repeated logo walls, unexplained stat blocks, "AI-powered" banners everywhere.
- **Borrow:**
  - Restrained dark or off-white palette with one accent
  - Monospace only for code and findings
  - Real artefacts as visuals: finding cards, report excerpts, methodology diagrams
  - Dense, readable type
- **Avoid:** hooded hackers, padlocks and shields, binary/Matrix rain, neon green on black, glowing globes, skulls.

## Not verified
- Exact colours and typography on every site.
- Bugcrowd's pentest pages (404).
- Rhino's service and quote pages (404).
- Cobalt's quote form fields.
- The regulatory details marked "background knowledge".
