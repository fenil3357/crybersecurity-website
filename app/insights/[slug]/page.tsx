import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { posts, getPost, formatDate, type Block } from "@/lib/posts";
import { getService } from "@/lib/services";
import { site } from "@/lib/site";
import { Button, Container, Placeholder } from "@/components/ui/primitives";
import { CtaBand, Section } from "@/components/sections/shared";
import { InsightCardClient } from "@/components/insights/InsightCardClient";
import { ReadingProgress } from "@/components/insights/ReadingProgress";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/insights/${p.slug}/` },
    openGraph: { type: "article", title: p.title, description: p.description, publishedTime: p.date },
  };
}

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case "p":
      return <p>{b.text}</p>;
    case "h2":
      return <h2 id={b.id}>{b.text}</h2>;
    case "list":
      return (
        <ul>
          {b.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case "code":
      return (
        <pre className="overflow-x-auto rounded-[6px] bg-slate p-5 font-mono text-[0.85rem] leading-relaxed text-slate-ink">
          <code>{b.code}</code>
        </pre>
      );
    case "table":
      return (
        <div className="overflow-x-auto font-sans">
          <table className="w-full min-w-[520px] border-collapse text-left text-[0.95rem]">
            <thead>
              <tr className="border-b-2 border-granite">
                {b.head.map((h, i) => (
                  <th key={i} scope="col" className="py-2.5 pr-4 font-semibold text-granite">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i} className="border-b border-granite/15 align-top">
                  {r.map((c, j) => (
                    <td key={j} className={j === 0 ? "py-3 pr-4 font-medium text-granite" : "py-3 pr-4"}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <aside className="rounded-[6px] border border-granite/15 bg-paper p-5 font-sans text-[1rem]">
          <p className="font-semibold text-granite">{b.title}</p>
          <p className="mt-1.5 leading-relaxed">{b.text}</p>
        </aside>
      );
  }
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const service = getService(p.relatedService)!;
  const toc = p.body.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2");
  const more = posts.filter((x) => x.slug !== p.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    author: { "@type": "Organization", name: site.legalName },
    publisher: { "@type": "Organization", name: site.legalName },
    mainEntityOfPage: `${site.url}/insights/${p.slug}/`,
  };

  return (
    <>
      <ReadingProgress />
      <article>
        <header className="border-b border-granite/10">
          <Container className="py-12 lg:py-16">
            <Link href="/insights/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-granite">
              <ArrowLeft aria-hidden className="size-4" /> All insights
            </Link>
            <p className="coord mt-8 flex flex-wrap gap-3 text-muted">
              <span className="text-trail">{p.category}</span>
              <span>{formatDate(p.date)}</span>
              <span>{p.readingTime}</span>
            </p>
            <h1 className="display mt-4 max-w-4xl text-[clamp(2.2rem,1.4rem+3vw,3.9rem)]">{p.title}</h1>
            <p className="lede mt-5 max-w-2xl">{p.description}</p>
          </Container>
        </header>

        <Container className="grid gap-12 py-12 lg:grid-cols-12 lg:py-16">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)]">
              <nav aria-label="On this page" className="hidden lg:block">
                <p className="text-sm font-semibold">On this page</p>
                <ul className="mt-3 space-y-2 border-l border-granite/15 text-[0.92rem]">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="-ml-px block border-l-2 border-transparent pl-3 text-granite-2 hover:border-trail hover:text-granite">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-8 hidden lg:block">
                <Placeholder label="Author profile" note="Named researcher, to be supplied" />
              </div>
            </div>
          </aside>

          <div className="min-w-0 lg:col-span-7">
            <div className="rounded-[6px] border border-granite/15 bg-paper p-5 sm:p-6">
              <p className="text-sm font-semibold">In short</p>
              <ul className="mt-3 space-y-2.5">
                {p.tldr.map((t) => (
                  <li key={t} className="flex gap-3 leading-relaxed text-granite-2">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rotate-45 bg-trail" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="prose-varden mt-10 max-w-[68ch]">
              {p.body.map((b, i) => (
                <BlockView key={i} b={b} />
              ))}
            </div>

            <aside className="mt-14 rounded-[8px] bg-slate p-6 text-white sm:p-8">
              <p className="coord text-slate-ink/80">{service.code} · related service</p>
              <p className="mt-3 text-[1.5rem] font-bold leading-tight tracking-[-0.025em]">{service.title}</p>
              <p className="mt-2 max-w-lg leading-relaxed text-slate-ink">{service.summary}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={`/contact/?service=${service.slug}`}>{site.primaryCta.label}</Button>
                <Button href={`/services/${service.slug}/`} variant="ghost-dark" arrow={false}>
                  About this service
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </article>

      <Section tone="stone-2">
        <h2 className="text-[1.8rem] font-bold tracking-[-0.025em]">More insights</h2>
        <div className="mt-8 grid gap-10 md:grid-cols-3">
          {more.map((m) => (
            <InsightCardClient key={m.slug} post={m} />
          ))}
        </div>
      </Section>

      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
