import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button, Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/lib/services";
import { posts } from "@/lib/posts";
import { InsightCardClient } from "@/components/insights/InsightCardClient";
import { site } from "@/lib/site";
import { contourRings } from "@/lib/contours";
import { cn } from "@/lib/cn";

/** Services as a survey legend: one ruled row per discipline, not a grid of identical cards. */
export function ServicesIndex({ exclude, heading = true }: { exclude?: string; heading?: boolean }) {
  const list = services.filter((s) => s.slug !== exclude);
  return (
    <div>
      {heading && (
        <div className="grid gap-6 lg:grid-cols-12">
          <h2 className="h2 lg:col-span-6">Six disciplines, one method</h2>
          <p className="lede lg:col-span-5 lg:col-start-8 lg:pt-3">
            Every service follows the same route, from scoping to retest, and produces the same audit-ready report. Choose by
            the asset you need tested.
          </p>
        </div>
      )}
      <ul className={cn("border-t border-granite/15", heading && "mt-12")}>
        {list.map((s, i) => (
          <Reveal as="li" key={s.slug} delay={i * 0.05}>
            <Link
              href={`/services/${s.slug}/`}
              className="group relative grid gap-2 border-b border-granite/15 py-6 transition-colors duration-200 hover:bg-paper/70 md:grid-cols-12 md:items-baseline md:gap-6 md:px-3"
            >
              <span className="coord text-trail md:col-span-1">{s.code}</span>
              <span className="text-[1.35rem] font-semibold leading-tight tracking-[-0.02em] md:col-span-4">{s.title}</span>
              <span className="text-[0.98rem] leading-relaxed text-granite-2 md:col-span-6">
                {s.summary} <span className="text-granite">{s.outcome}</span>
              </span>
              <ArrowUpRight
                aria-hidden
                className="absolute right-0 top-6 size-5 text-granite/50 transition-[transform,color] duration-200 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-trail md:static md:col-span-1 md:justify-self-end"
              />
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

export function InsightCard({ slug }: { slug: string }) {
  return <InsightCardClient post={posts.find((x) => x.slug === slug)!} />;
}

export function Faq({ items, title = "Questions buyers ask" }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <h2 className="h2 lg:col-span-4">{title}</h2>
      <div className="lg:col-span-8">
        <div className="border-t border-granite/15">
          {items.map((f) => (
            <details key={f.q} className="group border-b border-granite/15">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.08rem] font-semibold leading-snug [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden
                  className="mt-1 grid size-6 shrink-0 place-items-center rounded-full border border-granite/25 text-sm transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-granite-2">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

const ctaRings = contourRings({ x: 980, y: 120, r: 420, rings: 18, seed: 41 });

/** Closing CTA: the route arrives. Every page ends here. */
export function CtaBand({
  title = "Scope your first test",
  body = "Tell us what you need tested and why. We agree targets, timing and rules of engagement on a short call, under NDA if you need it.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-slate text-white">
      <svg viewBox="0 0 1200 420" preserveAspectRatio="xMaxYMid slice" aria-hidden className="absolute inset-0 h-full w-full">
        {ctaRings.map((r, i) => (
          <path key={i} d={r.d} fill="none" stroke="#3d505c" strokeWidth={r.index ? 1.6 : 1} />
        ))}
      </svg>
      <Container className="relative grid gap-8 py-20 md:grid-cols-12 md:items-end lg:py-28">
        <div className="md:col-span-8">
          <h2 className="h2 text-white">{title}</h2>
          <p className="lede mt-5 max-w-xl text-slate-ink">{body}</p>
        </div>
        <div className="flex flex-col gap-3 md:col-span-4 md:items-end">
          <Button href={site.primaryCta.href}>{site.primaryCta.label}</Button>
          <Link href="/services/" className="inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-slate-ink hover:text-white">
            Compare services <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export function Section({ children, className, id, tone = "stone" }: { children: React.ReactNode; className?: string; id?: string; tone?: "stone" | "stone-2" | "paper" }) {
  const bg = { stone: "bg-stone", "stone-2": "bg-stone-2", paper: "bg-paper" }[tone];
  return (
    <section id={id} className={cn(bg, "py-20 lg:py-28", className)}>
      <Container>{children}</Container>
    </section>
  );
}
