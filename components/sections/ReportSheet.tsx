import { FindingCard } from "@/components/ui/FindingCard";
import { getService } from "@/lib/services";

// Illustrative sample data only; labelled on the sheet itself.
const summary = [
  { sev: "Critical", n: 1, w: "12%" },
  { sev: "High", n: 3, w: "34%" },
  { sev: "Medium", n: 5, w: "56%" },
  { sev: "Low", n: 4, w: "45%" },
];

export function ReportSheet() {
  const api = getService("api-security-review")!.sampleFinding;
  return (
    <div className="relative rounded-[8px] border border-granite/15 bg-paper p-5 shadow-[0_30px_60px_-40px_rgb(20_24_26/0.5)] sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-granite/12 pb-4">
        <div>
          <p className="coord text-muted">SAMPLE REPORT · illustrative data</p>
          <p className="mt-1 text-lg font-semibold tracking-[-0.015em]">Penetration test: customer platform and API</p>
        </div>
        <span className="coord rounded-[3px] border border-granite/20 px-2 py-1 text-granite-2">v1.1 · retest</span>
      </div>

      <div className="grid gap-6 pt-5 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold">Executive summary</p>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-granite-2">
            Testing found a path from a standard user account to administrative access through the API. All critical and
            high findings were fixed and verified on retest.
          </p>
          <dl className="mt-5 space-y-2.5">
            {summary.map((s) => (
              <div key={s.sev} className="grid grid-cols-[4.5rem_1fr_1.5rem] items-center gap-3 text-sm">
                <dt className="font-medium">{s.sev}</dt>
                <dd className="h-2 rounded-full bg-granite/8">
                  <span
                    className={s.sev === "Critical" || s.sev === "High" ? "block h-2 rounded-full bg-trail" : "block h-2 rounded-full bg-granite/45"}
                    style={{ width: s.w }}
                  />
                </dd>
                <dd className="tnum text-right text-granite-2">{s.n}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-granite">
            <span aria-hidden className="grid size-5 place-items-center rounded-full bg-granite text-[0.7rem] text-white">✓</span>
            Critical and high: resolved on retest
          </p>
        </div>
        <FindingCard finding={api} />
      </div>
    </div>
  );
}
