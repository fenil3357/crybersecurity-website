import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { CtaBand, Section, ServicesIndex } from "@/components/sections/shared";
import { Reveal } from "@/components/motion/Reveal";
import { getService } from "@/lib/services";
import { engagement } from "@/lib/process";

export const metadata: Metadata = {
  title: "Penetration Testing Services",
  description:
    "Six manual-first penetration testing services: VAPT, web application, mobile, API, network and thick-client testing. Find the right test for your audit, launch or customer review.",
  alternates: { canonical: "/services/" },
};

const guide = [
  { situation: "Preparing for a SOC 2 or ISO 27001 audit", slugs: ["web-application-penetration-testing", "api-security-review"] },
  { situation: "PCI DSS v4 requirement 11.4 testing", slugs: ["network-penetration-testing", "web-application-penetration-testing"] },
  { situation: "Launching or opening up an API", slugs: ["api-security-review"] },
  { situation: "Releasing a banking or payments app", slugs: ["mobile-application-penetration-testing", "api-security-review"] },
  { situation: "An enterprise customer asked for a pentest report", slugs: ["web-application-penetration-testing", "vulnerability-assessment-penetration-testing"] },
  { situation: "Due diligence before funding or acquisition", slugs: ["vulnerability-assessment-penetration-testing"] },
  { situation: "Staff use a trading or back-office desktop tool", slugs: ["thick-client-penetration-testing", "network-penetration-testing"] },
  { situation: "Worried about one compromised laptop", slugs: ["network-penetration-testing"] },
];

export default function ServicesPage() {
  return (
    <>
      <section className="survey-grid border-b border-granite/10">
        <Container className="py-16 lg:py-24">
          <h1 className="display max-w-4xl text-[clamp(2.6rem,1.5rem+4vw,4.8rem)]">Penetration testing services</h1>
          <p className="lede mt-6 max-w-2xl">
            Six disciplines, each tested by hand against public standards and delivered with the same report format and
            included retest. Pick by asset, or start from the situation you are in.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] font-semibold">
            <a href="#guide" className="inline-flex items-center gap-1.5 hover:text-trail">
              Which test do you need? <ArrowRight aria-hidden className="size-4" />
            </a>
            <a href="#process" className="inline-flex items-center gap-1.5 hover:text-trail">
              How every test runs <ArrowRight aria-hidden className="size-4" />
            </a>
          </div>
        </Container>
      </section>

      <Section>
        <ServicesIndex heading={false} />
      </Section>

      <Section id="guide" tone="stone-2">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="h2">Which test do you need?</h2>
            <p className="lede mt-5">Most engagements start from a deadline or a request. Find yours, and we will confirm the right scope on the call.</p>
          </div>
          <div className="lg:col-span-8">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Situations mapped to recommended services</caption>
              <thead>
                <tr className="border-b-2 border-granite text-sm">
                  <th scope="col" className="py-3 pr-4 font-semibold">Your situation</th>
                  <th scope="col" className="py-3 font-semibold">Start with</th>
                </tr>
              </thead>
              <tbody>
                {guide.map((g) => (
                  <tr key={g.situation} className="border-b border-granite/15 align-top">
                    <td className="py-4 pr-4 text-[1rem] font-medium">{g.situation}</td>
                    <td className="py-4">
                      <ul className="flex flex-col gap-1.5">
                        {g.slugs.map((slug) => {
                          const s = getService(slug)!;
                          return (
                            <li key={slug}>
                              <Link href={`/services/${slug}/`} className="inline-flex items-baseline gap-2 text-[0.95rem] hover:text-trail">
                                <span className="coord w-9 text-trail">{s.code}</span>
                                <span className="underline decoration-granite/25 underline-offset-4">{s.shortTitle}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section id="process">
        <h2 className="h2 max-w-2xl">Every test follows the same route</h2>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-[8px] border border-granite/15 bg-granite/15 md:grid-cols-5">
          {engagement.map((e, i) => (
            <Reveal as="li" key={e.step} delay={i * 0.05} className="bg-stone p-6">
              <p className="coord text-trail">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-3 text-lg font-semibold">{e.step}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-granite-2">{e.youGet}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaBand />
    </>
  );
}
