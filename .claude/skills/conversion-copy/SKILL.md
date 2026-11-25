---
name: conversion-copy
description: Writing rules for every word on this site (headlines, sublines, section headings, service copy, CTAs, form labels, errors, blog titles, meta titles and descriptions). Plain, category-first B2B security copy that converts both technical and non-technical buyers, with no AI-copy tells and no invented claims. Use before writing or editing any visible text, metadata or blog content.
---

# Conversion copy for an offensive-security firm

Adapted from tasteskill's copy layer (MIT, © 2026 Leonxlnx, github.com/Leonxlnx/taste-skill) and narrowed to B2B cybersecurity. The **strategy** (who reads which page, what they need) lives in `security-site-strategy`. This skill decides **how the words read**.

## The reader test
Every line must survive two readers at once:
- **The CISO / security lead** asks: "Do they know what they're doing?" Win them with exact scope, method and deliverables.
- **The CEO / CFO / compliance lead** asks: "What does this get me, and what does it unblock?" Win them with outcomes: audit evidence, closing enterprise deals, answering customer security questionnaires, findings fixed before attackers find them.

Write the technical fact, then its business consequence, in the same breath:
> Manual testing of authentication, session handling and business logic, so the flaws scanners miss are fixed before your SOC 2 audit window.

## Five rules
1. **The h1 names the category and the buyer** in 2–10 words, e.g. "Penetration testing for fintech and SaaS teams". Never a riddle, mood or slogan ("Security, reimagined", "Think like an attacker").
2. **The first screen holds one hard, true fact.** Something checkable: the six testing disciplines, the standards followed (OWASP, PTES, NIST SP 800-115), "manual-first testing with free retest" (only if the client confirms it, otherwise left out). Never a statistic we don't have.
3. **Every heading has a noun that names a thing**, e.g. "What we test in your API", "Deliverables", "How an engagement runs", "Frameworks your report supports". 1–7 words. No questions as headings (FAQ items excepted), no colon headings, no "X. Y." fragment pairs (one per site at most).
4. **Buttons are a verb plus what the visitor gets**, 1–5 words: "Book a scoping call", "Get a testing quote", "See a sample report", "Read the article". Never "Learn more", "Discover", "Explore", "Click here", "Get started" on its own.
5. **One primary action, worded the same everywhere.** Recommended: **"Book a scoping call"**. It must be identical in the nav, the hero, every closing CTA band and on mobile. At most 2 actions in a hero. Keep to about 8 distinct CTA labels across the whole site.

## Section copy budgets
- Hero subline: 15–30 words. Say how it works and the main benefit.
- Under a section heading: 10–40 words, at most two sentences.
- Card body: one or two sentences, at most 25 words, with one concrete detail (a vuln class, a framework, a platform).
- About 60–80 words per desktop screen on marketing pages. Depth (methodology detail, test-case lists) goes in service pages, accordions or the blog.
- Blog articles are the exception: long-form, structured for reading and SEO (see below).

## Honesty rules (hard, from the brief)
- **No invented proof:** no testimonials, client names or logos, case-study results, ratings, years in business, team size, "X vulnerabilities found", "trusted by", awards, press, or "100%"/"guaranteed" anything.
- **Compliance wording:** "produces evidence for your SOC 2 / ISO 27001 / PCI DSS / DORA / HIPAA audit", "maps findings to OWASP and CWE". Never "makes you compliant", "certified testers" or "CREST-approved" unless the client supplies proof.
- **Placeholders are design, not copy.** Missing assets (logo, certification badges, testimonials, researcher bios, client logos) use the shared `<Placeholder>` component in a deliberately designed slot labelled e.g. "Certification badges, to be supplied". **Never** put brackets, "lorem ipsum", "TBD" or "[Company]" inside running copy. Write a real sentence, or leave the element out.
- **The company name** comes from `lib/site.ts` (`site.name`). Never hard-code it in copy.
- **No phone numbers, real-format addresses or real emails.** Use `hello@company.example` style addresses; contact happens through the form.

## Banned words and patterns (AI-copy tells)
- **Filler words:** elevate, unlock, unleash, empower, harness, supercharge, seamless, effortless, cutting-edge, revolutionary, transformative, holistic, next-generation, world-class, best-in-class, game-changing, state-of-the-art, bespoke, synergy, leverage (verb), robust, powerful, unparalleled, delve, realm, landscape, ecosystem, journey, "in today's threat landscape", "ever-evolving threats", "peace of mind", "stay one step ahead", "fortify", "bulletproof", "military-grade".
- **Stock lines:** "In today's fast-paced world", "Look no further", "Ready to transform your security?", "Whether you're A or B", "It's not just X, it's Y", "Trusted by teams worldwide".
- **Shapes:** a "-ing" rider tacked onto a fact (", ensuring robust protection"), a question answered immediately ("The result? …"), colon reveals, "serves as" / "plays a key role", more than two contrast frames ("not X but Y", "rather than") per page, exclamation marks, em-dash chains, emoji bullets.
- **Virtue words about ourselves:** honest, transparent, passionate, dedicated, trusted, genuinely, truly, simply. Show the quality with a fact instead ("every finding includes a working proof of concept and a fix").
- **Fear-mongering:** breach-cost scare stats, "hackers are coming for you". Prefer calm authority.
- **Layout tells in copy:** an eyebrow or kicker label above every heading, "01 / 02 / 03" numbering on things that aren't a sequence, a row of three hero stats.

## Section-by-section moves
- **Hero:** category + buyer h1, then a subline with method and outcome, then the primary CTA and one secondary ("See a sample report" or "View services").
- **Services:** each card has a title naming the target ("Web application penetration testing"), one sentence on what's tested, and one on what you get. Service pages follow the anatomy in `security-site-strategy`.
- **Process:** the real steps in order (Scope → Test → Report → Retest), each with what the client does and receives. Numbering is fine here because it *is* a sequence.
- **Industries:** name the regulation and the moment: "Preparing for SOC 2 Type II", "PCI DSS v4 requirement 11.4", "DORA threat-led testing in EU finance". Say "supports evidence for", not "ensures".
- **FAQ:** real buyer questions (cost drivers, duration, production impact, retesting, report format, NDAs). Answers are 1–3 sentences with a fact.
- **Closing CTA band:** a heading naming the action's outcome ("Scope your first test"), one line on what happens next ("A 30-minute call to agree targets, timing and rules of engagement."), then the primary CTA.
- **Forms:** a label names what goes in ("Work email", "What needs testing"), never a question. Errors name the field and the fix ("Enter a work email, e.g. name@company.com"). The success message restates what happens next.

## Blog and SEO copy
- Titles match search intent and name the topic plainly, e.g. "API penetration testing: what's covered and how to prepare". 50–60 characters for `<title>`, 140–160 for the meta description.
- Article structure: TL;DR (2–3 lines) → H2 sections answering real questions → a practical checklist → a CTA tied to the topic. Use code blocks and tables where they help a technical reader.
- Placeholder article content may be realistic and educational, but must not claim real engagements, real clients or real findings ("in a recent test for a bank, we…").

## Self-check before finishing
1. Read each headline aloud to a fintech CTO and then to a CFO. Does each understand what is offered?
2. Grep the changed files for the banned words and for "certified", "guarantee", "100%", "trusted", "clients", and for digits that look like stats.
3. Is the primary CTA label identical everywhere?
4. Is there no bracket or placeholder text inside running copy?
