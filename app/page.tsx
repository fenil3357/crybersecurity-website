/*
Scroll score (Home)
1 hero         recognition  parallax + pointer + route draw   layered terrain, headline readable at rest
2 why manual   unease       flow-in                            quiet before the peak
3 route        clarity      PIN (peak)                         scope, recon, exploit, report, retest drawn by scroll
4 services     breadth      flow-in stagger                    six disciplines as a legend
5 report       confidence   reveal wipe                        what you actually receive
6 industries   recognition  flow-in                            regulations named plainly
7 proof slots  trust        none                               placeholders, honest
8 insights     curiosity    flow-in
9 faq          calm         none
10 close       resolve      static                             one action
*/
import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero/Hero";
import { RouteScroll } from "@/components/sections/route/RouteScroll";
import { ServicesIndex, InsightCard, Faq, CtaBand, Section } from "@/components/sections/shared";
import { ReportSheet } from "@/components/sections/ReportSheet";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Button, Placeholder } from "@/components/ui/primitives";
import { contourRings } from "@/lib/contours";
import { frameworks, site } from "@/lib/site";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: { absolute: `Penetration Testing for Fintech and SaaS | ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
};

const routePoints = [
  { x: 110, y: 110 },
  { x: 260, y: 230 },
  { x: 430, y: 165 },
  { x: 570, y: 290 },
  { x: 700, y: 360 },
];
function curve(pts: { x: number; y: number }[]) {
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const mx = (a.x + b.x) / 2;
    d += ` C${mx},${a.y} ${mx},${b.y} ${b.x},${b.y}`;
  }
  return d;
}
const routeTerrain = [
  ...contourRings({ x: 300, y: 260, r: 300, rings: 15, seed: 5 }),
  ...contourRings({ x: 700, y: 120, r: 220, rings: 10, seed: 17 }),
];

const homeFaqs = [
  {
    q: "How is this different from an automated scan?",
    a: "Scanners report known issues one at a time. Our testers work by hand, understand your business logic and chain weaknesses into real attack paths, which is where the serious findings are.",
  },
  {
    q: "What drives the cost of a penetration test?",
    a: "Mainly the number of user roles, business workflows, API endpoints, platforms and network ranges in scope. We give a fixed proposal after the scoping call.",
  },
  {
    q: "Will the report satisfy our auditor?",
    a: "Reports include an executive summary, methodology, scope, dated findings and retest results, which is what SOC 2, ISO 27001 and PCI DSS auditors typically ask to see.",
  },
  {
    q: "Is retesting included?",
    a: "Yes. After your team fixes the findings, we retest them and update the report so it shows the resolved state.",
  },
  {
    q: "Do you work with companies in both the US and Europe?",
    a: "Yes. We work with organisations in the United States and Europe and can align testing windows with your time zone.",
  },
  {
    q: "Can we sign an NDA first?",
    a: "Yes. We sign a mutual NDA before the scoping call whenever you need one.",
  },
];

const industries = [
  {
    name: "Fintech and payments",
    trigger: "PCI DSS v4 requirement 11.4, DORA, bank partner due diligence",
    body: "Payment flows, ledgers, open banking APIs and mobile banking apps, tested for the logic flaws that move money.",
  },
  {
    name: "B2B SaaS",
    trigger: "SOC 2 Type II, ISO 27001, enterprise security questionnaires",
    body: "Multi-tenant isolation, SSO and admin roles, so one customer can never reach another customer's data.",
  },
  {
    name: "Health and insurance",
    trigger: "HIPAA, NIS2, customer and regulator reviews",
    body: "Patient and policyholder data across portals, APIs and partner integrations.",
  },
  {
    name: "Other regulated organisations",
    trigger: "ISO 27001, NIS2, board and investor reviews",
    body: "Networks, desktop tools and internal applications in environments where evidence matters as much as the fix.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* 2. quiet before the peak */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="h2">Scanners find known issues. Attackers find your logic.</h2>
            <p className="lede mt-5">
              The findings that lead to breaches are rarely in a scanner&apos;s signature list. They sit in how your product
              decides who can see what, and in how small weaknesses connect.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[8px] border border-granite/15 bg-granite/15 sm:grid-cols-2 lg:col-span-7">
            <div className="bg-stone-2 p-6 sm:p-7">
              <p className="text-sm font-semibold text-muted">Automated scanning finds</p>
              <ul className="mt-4 space-y-3 text-[0.98rem] text-granite-2">
                <li>Known CVEs and missing patches</li>
                <li>Missing security headers</li>
                <li>Common injection patterns</li>
                <li>Weak TLS configuration</li>
              </ul>
            </div>
            <div className="bg-paper p-6 sm:p-7">
              <p className="text-sm font-semibold text-trail">Manual testing adds</p>
              <ul className="mt-4 space-y-3 text-[0.98rem] font-medium text-granite">
                <li>Cross-tenant and cross-account data access</li>
                <li>Abuse of payments, refunds and approvals</li>
                <li>Privilege escalation through chained issues</li>
                <li>Proof of impact your board understands</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. the peak */}
      <section className="survey-grid-dark bg-slate" aria-label="How an engagement runs">
        <RouteScroll
          points={routePoints}
          routeD={curve(routePoints)}
          terrain={
            <svg viewBox="0 0 800 560" preserveAspectRatio="xMidYMid slice" aria-hidden className="h-full w-full">
              {routeTerrain.map((r, i) => (
                <path key={i} d={r.d} fill="none" stroke="#3d505c" strokeWidth={r.index ? 1.5 : 0.9} />
              ))}
            </svg>
          }
        />
      </section>

      {/* 4. services */}
      <Section id="services">
        <ServicesIndex />
      </Section>

      {/* 5. what you receive */}
      <Section id="sample-finding" tone="stone-2">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <h2 className="h2">What you receive</h2>
            <p className="lede mt-5">
              A report two audiences can use. Leadership and auditors read the summary. Engineers get reproduction steps and
              fixes for every finding.
            </p>
            <ul className="mt-8 space-y-3 text-[0.98rem]">
              {[
                "Executive summary in plain language",
                "Findings scored with CVSS and business impact",
                "Proof of concept and fix for each issue",
                "Retest report showing what is resolved",
                "Affected assets and references for every issue",
              ].map((d) => (
                <li key={d} className="flex gap-3">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rotate-45 bg-trail" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <ClipReveal className="lg:col-span-8">
            <ReportSheet />
          </ClipReveal>
        </div>
      </Section>

      {/* 6. industries */}
      <Section id="industries">
        <div className="grid gap-6 lg:grid-cols-12">
          <h2 className="h2 lg:col-span-6">Built for regulated products</h2>
          <p className="lede lg:col-span-5 lg:col-start-8 lg:pt-3">
            Testing is usually triggered by an audit, a customer review or a release. We scope around that moment and write
            the report for whoever needs to read it.
          </p>
        </div>
        <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2">
          {industries.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 0.06} className="border-t border-granite/20 pt-6">
              <h3 className="text-[1.4rem] font-semibold tracking-[-0.02em]">{ind.name}</h3>
              <p className="coord mt-2 text-trail">{ind.trigger}</p>
              <p className="mt-3 max-w-lg leading-relaxed text-granite-2">{ind.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 rounded-[8px] border border-granite/15 bg-paper p-6 sm:p-8">
          <p className="text-[1.05rem] font-semibold">Frameworks your report supports evidence for</p>
          <ul className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {frameworks.map((f) => (
              <li key={f.id}>
                <p className="font-semibold">{f.name}</p>
                <p className="mt-1 text-[0.92rem] leading-relaxed text-granite-2">{f.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[0.85rem] text-muted">
            A penetration test supports your compliance evidence. It does not by itself make you compliant.
          </p>
        </div>
      </Section>

      {/* 7. honest proof slots */}
      <Section tone="stone-2" className="py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <h2 className="text-[1.6rem] font-bold leading-tight tracking-[-0.025em]">Credentials and references</h2>
            <p className="mt-3 leading-relaxed text-granite-2">
              Reserved for the firm&apos;s certifications, client references and team profiles once supplied.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:col-span-8">
            <Placeholder label="Certifications and accreditations" note="To be supplied by the client" />
            <Placeholder label="Client testimonials" note="To be supplied by the client" />
            <Placeholder label="Client logos" note="Shown only with permission" />
          </div>
        </div>
      </Section>

      {/* 8. insights */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="h2">Insights for security and compliance leads</h2>
          <Button href="/insights/" variant="secondary">
            Read all insights
          </Button>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <InsightCard slug={p.slug} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 9. faq */}
      <Section tone="paper">
        <Faq items={homeFaqs} />
      </Section>

      {/* 10. close */}
      <CtaBand />
    </>
  );
}
