import type { Metadata } from "next";
import { Container, Placeholder } from "@/components/ui/primitives";
import { CtaBand, Section } from "@/components/sections/shared";
import { Reveal } from "@/components/motion/Reveal";
import { contourRings } from "@/lib/contours";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Varden is an offensive security firm doing manual-first penetration testing for fintech, SaaS and regulated organisations in the US and Europe.",
  alternates: { canonical: "/about/" },
};

const principles = [
  {
    title: "Manual first",
    body: "Tools support the work; people do it. Every engagement is led by testers who read your application the way an attacker would.",
  },
  {
    title: "Proof over opinion",
    body: "A finding comes with a reproduction and its impact on your data or money, so nobody has to take severity on trust.",
  },
  {
    title: "Written for two readers",
    body: "Each report has a summary leadership and auditors can read, and technical detail engineers can act on immediately.",
  },
  {
    title: "Finished means fixed",
    body: "Retesting is included. An engagement ends when your fixes are verified, not when the report is sent.",
  },
];

const handling = [
  { title: "NDA before scoping", body: "We sign a mutual NDA before the scoping call whenever you need one." },
  { title: "Rules of engagement", body: "Targets, windows, exclusions and emergency contacts are agreed in writing before testing." },
  { title: "Critical issue escalation", body: "Anything critical is reported to your named contact straight away, not saved for the report." },
  { title: "Encrypted delivery", body: "Reports and evidence are shared through encrypted channels agreed with your team." },
];

const ridge = contourRings({ x: 900, y: 420, r: 520, rings: 20, seed: 63 });

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-granite/10">
        <svg viewBox="0 0 1200 520" preserveAspectRatio="xMaxYMid slice" aria-hidden className="absolute inset-0 h-full w-full">
          {ridge.map((r, i) => (
            <path key={i} d={r.d} fill="none" stroke={r.index ? "#8a9d95" : "#b4c1ba"} strokeWidth={r.index ? 1.4 : 0.9} />
          ))}
        </svg>
        <Container className="relative py-20 lg:py-28">
          <h1 className="display max-w-4xl text-[clamp(2.6rem,1.5rem+4vw,4.8rem)]">
            We mark the route attackers would take, so you can close it
          </h1>
          <p className="lede mt-6 max-w-2xl">
            {site.name} is an offensive security firm. We do manual-first penetration testing for fintech, SaaS and regulated
            organisations in the {site.regions}.
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 className="h2 lg:col-span-5">Why we started</h2>
          <div className="space-y-5 text-[1.08rem] leading-relaxed text-granite-2 lg:col-span-6 lg:col-start-7">
            <p>
              Fintech and SaaS companies are tested constantly: by auditors, by enterprise customers, by regulators and by
              attackers. Too often the penetration test that is meant to prepare them is a scanner report with a cover page.
            </p>
            <p>
              We built {site.name} around the opposite approach. Our testers work through your product by hand, find
              the issues that matter to your business, explain them so they get fixed, and verify the fixes.
            </p>
            <p className="text-sm text-muted">
              Founding story, founders and company history to be supplied by the client.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="stone-2">
        <h2 className="h2 max-w-2xl">How we work</h2>
        <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05} className="border-t-2 border-granite pt-5">
              <h3 className="text-[1.35rem] font-semibold tracking-[-0.02em]">{p.title}</h3>
              <p className="mt-3 max-w-lg leading-relaxed text-granite-2">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="survey-grid-dark bg-slate py-20 text-white lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="h2 text-white">Our mission</h2>
          </div>
          <p className="text-[clamp(1.35rem,1.1rem+1vw,1.9rem)] font-medium leading-snug tracking-[-0.015em] text-white lg:col-span-7">
            Help regulated companies prove their products are secure, with testing deep enough to trust and reports clear
            enough to act on.
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="h2">Confidentiality and data handling</h2>
            <p className="lede mt-5">You are trusting us with access to your systems. These commitments come first.</p>
          </div>
          <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-8">
            {handling.map((h) => (
              <div key={h.title} className="border-t border-granite/15 pt-4">
                <dt className="font-semibold">{h.title}</dt>
                <dd className="mt-1.5 leading-relaxed text-granite-2">{h.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section tone="stone-2">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="h2">The team</h2>
            <p className="lede mt-5">Researcher profiles, backgrounds and credentials will appear here once supplied.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:col-span-8">
            <Placeholder label="Lead tester profile" note="Photo, background, talks" />
            <Placeholder label="Researcher profile" note="Photo, background, research" />
            <Placeholder label="Certifications" note="To be supplied by the client" />
          </div>
        </div>
      </Section>

      <Section id="disclosure">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 className="h2 lg:col-span-5">Responsible disclosure</h2>
          <div className="space-y-4 text-[1.05rem] leading-relaxed text-granite-2 lg:col-span-6 lg:col-start-7">
            <p>
              If you believe you have found a vulnerability in our own systems, email{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-granite underline decoration-trail">
                {site.email}
              </a>{" "}
              with the details. We will acknowledge your report and keep you updated while we investigate.
            </p>
            <p className="text-sm text-muted">Full policy and security.txt to be published with the live site.</p>
          </div>
        </div>
      </Section>

      <CtaBand title="Talk to the team" body="Tell us what you need tested and why. We will agree scope, timing and rules of engagement on a short call." />
    </>
  );
}
