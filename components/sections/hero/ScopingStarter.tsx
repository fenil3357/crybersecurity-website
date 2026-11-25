"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

/** The primary action in its working form: pick what needs testing, leave a work email, continue to the call booking. */
export function ScopingStarter() {
  const router = useRouter();
  const [picked, setPicked] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const toggle = (slug: string) =>
    setPicked((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a work email, for example name@company.com");
      return;
    }
    const q = new URLSearchParams();
    if (picked.length) q.set("service", picked.join(","));
    if (email) q.set("email", email);
    router.push(`/contact/${q.size ? `?${q}` : ""}`);
  };

  return (
    <form onSubmit={submit} noValidate className="rounded-[var(--radius-card)] border border-granite/15 bg-paper/90 p-4 sm:p-5">
      <fieldset>
        <legend className="text-[0.9rem] font-semibold">What needs testing?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {services.map((s) => {
            const on = picked.includes(s.slug);
            return (
              <button
                key={s.slug}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(s.slug)}
                className={cn(
                  "inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 text-[0.86rem] font-medium transition-[background-color,border-color,color] duration-150",
                  on ? "border-granite bg-granite text-white" : "border-granite/20 bg-stone/60 text-granite hover:border-granite/50",
                )}
              >
                {on && <Check aria-hidden className="size-3.5" />}
                {s.shortTitle}
              </button>
            );
          })}
        </div>
      </fieldset>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label htmlFor="starter-email" className="sr-only">
          Work email
        </label>
        <input
          id="starter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Work email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          aria-invalid={!!error}
          aria-describedby={error ? "starter-error" : undefined}
          className="min-h-12 flex-1 rounded-[5px] border border-granite/20 bg-white px-4 text-[0.95rem] placeholder:text-muted focus:border-granite focus:outline-none"
        />
        <button
          type="submit"
          className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-[5px] bg-trail px-5 text-[0.95rem] font-semibold text-white shadow-[0_6px_16px_-6px_rgb(210_43_28/0.55)] transition-[background-color,transform] duration-150 hover:bg-[#b82214] active:scale-[0.97]"
        >
          {site.primaryCta.label}
          <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
      {error && (
        <p id="starter-error" role="alert" className="mt-2 text-sm font-medium text-trail">
          {error}
        </p>
      )}
      <p className="mt-3 text-[0.82rem] text-muted">A short call to agree targets, timing and rules of engagement. We can sign an NDA first.</p>
    </form>
  );
}
