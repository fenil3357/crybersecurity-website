import type { Service } from "@/lib/services";
import { cn } from "@/lib/cn";

const sevStyle: Record<string, string> = {
  Critical: "bg-trail text-white",
  High: "bg-trail/12 text-trail ring-1 ring-trail/40",
  Medium: "bg-granite/8 text-granite ring-1 ring-granite/25",
  Low: "bg-granite/5 text-muted ring-1 ring-granite/15",
};

/** A sample finding, set like a map legend. Always labelled as sample data. */
export function FindingCard({
  finding,
  className,
  compact,
}: {
  finding: Service["sampleFinding"];
  className?: string;
  compact?: boolean;
}) {
  return (
    <article
      className={cn(
        "rounded-[var(--radius-card)] border border-granite/15 bg-paper text-granite shadow-[0_1px_0_rgb(20_24_26/0.04),0_18px_40px_-24px_rgb(20_24_26/0.35)]",
        className,
      )}
    >
      <header className="flex items-center justify-between gap-3 border-b border-granite/10 px-4 py-2.5">
        <span className="coord text-muted">{finding.id} · sample finding</span>
        <span className={cn("rounded-[3px] px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-[0.04em]", sevStyle[finding.severity])}>
          {finding.severity}
        </span>
      </header>
      <div className={cn("space-y-3 px-4", compact ? "py-3" : "py-4")}>
        <h3 className="text-[1.02rem] font-semibold leading-snug tracking-[-0.01em]">{finding.title}</h3>
        <p className="coord break-all text-granite-2">{finding.asset}</p>
        {!compact && (
          <dl className="grid gap-3 text-sm leading-relaxed">
            <div>
              <dt className="font-semibold text-granite">Impact</dt>
              <dd className="text-granite-2">{finding.impact}</dd>
            </div>
            <div>
              <dt className="font-semibold text-granite">Fix</dt>
              <dd className="text-granite-2">{finding.fix}</dd>
            </div>
          </dl>
        )}
      </div>
    </article>
  );
}
