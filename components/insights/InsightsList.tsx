"use client";

import { useState } from "react";
import { InsightCardClient } from "./InsightCardClient";
import type { Post } from "@/lib/posts";
import { cn } from "@/lib/cn";

export function InsightsList({ posts }: { posts: Post[] }) {
  const cats = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? posts : posts.filter((p) => p.category === cat);
  return (
    <div>
      <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
            className={cn(
              "min-h-10 rounded-full border px-4 text-[0.9rem] font-medium transition-colors duration-150",
              cat === c ? "border-granite bg-granite text-white" : "border-granite/20 hover:border-granite/60",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {shown.length} articles shown
      </p>
      <div className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <InsightCardClient key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}
