import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { CtaBand, Section } from "@/components/sections/shared";
import { InsightsList } from "@/components/insights/InsightsList";
import { Subscribe } from "@/components/insights/Subscribe";
import { posts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Insights: Penetration Testing and Compliance",
  description:
    "Practical guides on penetration testing, API security and compliance evidence for SOC 2, PCI DSS, DORA and ISO 27001, written for security and compliance leads.",
  alternates: { canonical: "/insights/" },
};

export default function InsightsPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <section className="survey-grid border-b border-granite/10">
        <Container className="py-16 lg:py-20">
          <h1 className="display max-w-3xl text-[clamp(2.6rem,1.5rem+4vw,4.8rem)]">Insights</h1>
          <p className="lede mt-5 max-w-2xl">
            Practical writing on penetration testing, application security and compliance evidence, for the people who have
            to buy, schedule and act on a test.
          </p>
        </Container>
      </section>

      <Section className="pb-10 lg:pb-12">
        <Link href={`/insights/${featured.slug}/`} className="group grid gap-8 rounded-[8px] border border-granite/15 bg-paper p-6 sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="coord flex gap-3 text-muted">
              <span className="text-trail">Featured · {featured.category}</span>
              <span>{formatDate(featured.date)}</span>
            </p>
            <h2 className="mt-4 text-[clamp(1.8rem,1.3rem+1.8vw,2.8rem)] font-bold leading-[1.05] tracking-[-0.03em] group-hover:underline group-hover:decoration-trail group-hover:decoration-2">
              {featured.title}
            </h2>
            <p className="lede mt-4">{featured.description}</p>
            <p className="mt-6 text-sm font-semibold">
              Read the article <span className="font-normal text-muted">· {featured.readingTime}</span>
            </p>
          </div>
          <ul className="space-y-3 border-t border-granite/15 pt-6 lg:col-span-4 lg:col-start-9 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <li className="text-sm font-semibold">In short</li>
            {featured.tldr.map((t) => (
              <li key={t} className="flex gap-3 text-[0.97rem] leading-relaxed text-granite-2">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rotate-45 bg-trail" />
                {t}
              </li>
            ))}
          </ul>
        </Link>
      </Section>

      <Section className="pt-6 lg:pt-8">
        <InsightsList posts={rest} />
      </Section>

      <Section tone="stone-2" className="py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <h2 className="text-[1.8rem] font-bold leading-tight tracking-[-0.025em]">Get new articles by email</h2>
            <p className="mt-3 leading-relaxed text-granite-2">One email when something new is published. No sales sequences.</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Subscribe />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
