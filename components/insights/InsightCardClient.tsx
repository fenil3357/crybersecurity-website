import Link from "next/link";
import { formatDate, type Post } from "@/lib/posts";

export function InsightCardClient({ post: p }: { post: Post }) {
  return (
    <Link href={`/insights/${p.slug}/`} className="group flex h-full flex-col border-t-2 border-granite pt-5">
      <p className="coord flex gap-3 text-muted">
        <span className="text-trail">{p.category}</span>
        <span>{formatDate(p.date)}</span>
      </p>
      <h3 className="mt-3 text-[1.3rem] font-semibold leading-snug tracking-[-0.02em] group-hover:underline group-hover:decoration-trail group-hover:decoration-2">
        {p.title}
      </h3>
      <p className="mt-3 text-[0.97rem] leading-relaxed text-granite-2">{p.description}</p>
      <p className="mt-auto pt-5 text-sm font-semibold">
        Read the article <span aria-hidden>·</span> <span className="font-normal text-muted">{p.readingTime}</span>
      </p>
    </Link>
  );
}
