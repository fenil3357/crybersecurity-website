import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { services, getService } from "@/lib/services";
import { frameworks, site } from "@/lib/site";
import { posts } from "@/lib/posts";
import { contourRings } from "@/lib/contours";
import { Button, Container } from "@/components/ui/primitives";
import { FindingCard } from "@/components/ui/FindingCard";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand, Faq, InsightCard, Section } from "@/components/sections/shared";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}/` },
    openGraph: { title: s.metaTitle, description: s.metaDescription },
  };
}

const deliverables = [
  { title: "Executive summary", body: "Plain-language risk overview for leadership, auditors and customers." },
  { title: "Technical findings", body: "Severity, affected assets, proof of concept and references for each issue." },
  { title: "Remediation guidance", body: "Specific fixes your engineers can apply, prioritised by risk." },
  { title: "Retest report", body: "Every finding verified after your fixes, with the resolved state documented." },
];

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const idx = services.findIndex((x) => x.slug === s.slug);
  const rings = contourRings({ x: 420, y: 250, r: 300, rings: 14, seed: 100 + idx * 13 });
  const related = s.related.map((r) => getService(r)!).filter(Boolean);
  const article = posts.find((p) => p.relatedService === s.slug) ?? posts[0];
  const fw = frameworks.filter((f) => s.frameworks.includes(f.id));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.title,
      serviceType: "Penetration testing",
      description: s.metaDescription,
      provider: { "@type": "Organization", name: site.legalName, url: site.url },
      areaServed: ["United States", "Europe"],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Services", item: `${site.url}/services/` },
        { "@type": "ListItem", position: 2, name: s.title, item: `${site.url}/services/${s.slug}/` },
      ],
    },
  ];

  const quote = `/contact/?service=${s.slug}`;
  const noun = s.noun;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-granite/10">
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMaxYMid slice" aria-hidden className="absolute inset-y-0 right-0 hidden h-full w-[55%] md:block">
          {rings.map((r, i) => (
            <path key={i} d={r.d} fill="none" stroke={r.index ? "#7d918a" : "#a9b8b0"} strokeWidth={r.index ? 1.4 : 0.9} />
          ))}
        </svg>
        <Container className="relative grid gap-10 py-14 md:grid-cols-12 lg:py-20">
          <div className="md:col-span-7">
            <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-sm text-muted">
              <Link href="/services/" className="hover:text-granite">Services</Link>
              <ChevronRight aria-hidden className="size-3.5" />
              <span className="text-granite">{s.shortTitle}</span>
            </nav>
            <h1 className="display text-[clamp(2.4rem,1.5rem+3.4vw,4.2rem)]">{s.h1}</h1>
            <p className="lede mt-6 max-w-xl">{s.forWho} {s.outcome}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={quote}>{site.primaryCta.label}</Button>
              <Button href="#sample" variant="secondary" arrow={false}>
                See a sample finding
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Typical targets">
              {s.targets.map((t) => (
                <li key={t} className="rounded-full border border-granite/20 bg-paper/70 px-3 py-1.5 text-[0.85rem] font-medium">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:col-span-5 md:flex md:items-end md:justify-end">
            <p className="coord rounded-[4px] bg-stone/85 px-2 py-1 text-granite-2">
              {s.code} · {s.standards.join(" · ")}
            </p>
          </div>
        </Container>
      </section>

      {/* Risk */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-12">
          <h2 className="h2 lg:col-span-5">{s.risk.heading}</h2>
          <p className="lede lg:col-span-6 lg:col-start-7 lg:pt-2">{s.risk.body}</p>
        </div>
      </Section>

      {/* What we test */}
      <Section tone="stone-2">
        <h2 className="h2 max-w-2xl">What we test</h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[8px] border border-granite/15 bg-granite/15 sm:grid-cols-2 lg:grid-cols-3">
          {s.testAreas.map((a, i) => (
            <Reveal key={a.title} delay={(i % 3) * 0.05} className="bg-stone p-6 sm:p-7">
              <h3 className="h3">{a.title}</h3>
              <p className="mt-2.5 leading-relaxed text-granite-2">{a.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Methodology: a real sequence, so numbering carries information */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="h2">Methodology</h2>
            <p className="lede mt-5">Manual-first testing aligned with {s.standards.slice(0, 2).join(" and ")}, scored with CVSS.</p>
          </div>
          <ol className="lg:col-span-8">
            {s.methodology.map((m, i) => (
              <li key={m.phase} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-granite/15 py-5 sm:grid-cols-[3rem_10rem_1fr]">
                <span className="coord pt-1 text-trail">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg font-semibold">{m.phase}</span>
                <span className="col-start-2 leading-relaxed text-granite-2 sm:col-start-3">{m.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Sample finding + deliverables */}
      <section id="sample" className="survey-grid-dark bg-slate py-20 text-white lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <h2 className="h2 text-white">What a finding looks like</h2>
            <p className="lede mt-5 max-w-lg text-slate-ink">
              Every issue is written so leadership understands the impact and engineers can reproduce and fix it.
            </p>
            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              {deliverables.map((d) => (
                <div key={d.title} className="border-t border-slate-rule pt-4">
                  <dt className="font-semibold">{d.title}</dt>
                  <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-slate-ink">{d.body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <FindingCard finding={s.sampleFinding} />
            <p className="mt-3 text-[0.85rem] text-slate-ink/80">Illustrative example. Real reports are shared only with you, under NDA.</p>
          </div>
        </Container>
      </section>

      {/* Inline CTA */}
      <Section tone="paper" className="py-14 lg:py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[1.5rem] font-bold leading-tight tracking-[-0.025em]">An audit or customer review coming up?</p>
            <p className="mt-2 text-granite-2">Tell us the deadline. We scope the {noun} test around it, and retesting is included.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={quote}>{site.primaryCta.label}</Button>
          </div>
        </div>
      </Section>

      {/* Compliance */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="h2">Compliance evidence</h2>
            <p className="lede mt-5">The report is structured for auditors and enterprise security reviews.</p>
          </div>
          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8">
            {fw.map((f) => (
              <li key={f.id} className="border-t border-granite/15 pt-4">
                <p className="font-semibold">{f.name}</p>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-granite-2">{f.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="paper">
        <Faq items={s.faqs} title={`Questions about ${noun} testing`} />
      </Section>

      {/* Related */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-[1.6rem] font-bold tracking-[-0.025em]">Related services</h2>
            <ul className="mt-6 border-t border-granite/15">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/services/${r.slug}/`} className="group grid gap-1 border-b border-granite/15 py-5 sm:grid-cols-[4rem_1fr]">
                    <span className="coord pt-1.5 text-trail">{r.code}</span>
                    <span>
                      <span className="block text-lg font-semibold group-hover:underline group-hover:decoration-trail">{r.title}</span>
                      <span className="mt-1 block text-granite-2">{r.summary}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <h2 className="text-[1.6rem] font-bold tracking-[-0.025em]">Further reading</h2>
            <div className="mt-6">
              <InsightCard slug={article.slug} />
            </div>
          </div>
        </div>
      </Section>

      <CtaBand title={`Scope your ${noun} test`} />

      {/* Mobile sticky action */}
      <div className="sticky bottom-0 z-40 border-t border-granite/15 bg-stone/95 p-3 md:hidden">
        <Link href={quote} className="flex min-h-12 items-center justify-center rounded-[5px] bg-trail text-[0.95rem] font-semibold text-white">
          {site.primaryCta.label}
        </Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
