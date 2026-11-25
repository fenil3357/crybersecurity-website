import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-10", className)}>{children}</div>;
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost-dark";
  className?: string;
  arrow?: boolean;
};

export function Button({ href, children, variant = "primary", className, arrow = true }: ButtonProps) {
  const styles = {
    primary:
      "bg-trail text-white hover:bg-[#b82214] shadow-[0_1px_0_rgb(0_0_0/0.15),0_6px_16px_-6px_rgb(210_43_28/0.55)]",
    secondary: "border border-granite/25 text-granite hover:border-granite hover:bg-granite/[0.04]",
    "ghost-dark": "border border-slate-ink/30 text-white hover:border-white hover:bg-white/[0.06]",
  }[variant];
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2 rounded-[5px] px-5 text-[0.95rem] font-semibold tracking-[-0.005em]",
        "transition-[background-color,border-color,transform] duration-150 ease-[var(--ease-out)] active:scale-[0.97]",
        styles,
        className,
      )}
    >
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}

/** A deliberately designed slot for assets the client has not supplied yet. Never holds invented facts. */
export function Placeholder({ label, note, className, dark }: { label: string; note?: string; className?: string; dark?: boolean }) {
  return (
    <div
      className={cn(
        "flex min-h-24 flex-col items-start justify-center gap-1 rounded-[var(--radius-card)] border border-dashed px-5 py-4",
        dark ? "border-slate-ink/35 text-slate-ink" : "border-granite/30 text-muted",
        className,
      )}
    >
      <span className="coord uppercase">Placeholder</span>
      <span className={cn("text-sm font-semibold", dark ? "text-white" : "text-granite")}>{label}</span>
      {note && <span className="text-sm">{note}</span>}
    </div>
  );
}

export function SectionIntro({
  title,
  body,
  className,
  dark,
  as: Tag = "h2",
}: {
  title: string;
  body?: string;
  className?: string;
  dark?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Tag className={cn(Tag === "h1" ? "display text-[clamp(2.6rem,1.6rem+4.4vw,5rem)]" : "h2", dark && "text-white")}>
        {title}
      </Tag>
      {body && <p className={cn("lede mt-5 max-w-2xl", dark && "text-slate-ink")}>{body}</p>}
    </div>
  );
}

/** Cairn mark: three stacked stones. Placeholder brand mark until the client logo arrives. */
export function CairnMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <ellipse cx="12" cy="20" rx="9" ry="2.6" />
      <ellipse cx="12" cy="13.6" rx="6.4" ry="2.4" />
      <ellipse cx="12" cy="7.6" rx="4" ry="2.1" />
      <rect x="10.6" y="1.6" width="2.8" height="2.8" rx="0.6" className="fill-trail" />
    </svg>
  );
}

export function Logo({ dark }: { dark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", dark ? "text-white" : "text-granite")}>
      <CairnMark className="size-6" />
      <span className="font-[family-name:var(--font-display)] text-[1.35rem] font-[750] tracking-[-0.035em]">Varden</span>
    </span>
  );
}
