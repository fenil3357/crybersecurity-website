"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { engagement } from "@/lib/process";
import { cn } from "@/lib/cn";

export type RoutePoint = { x: number; y: number };

/**
 * Signature moment. Desktop: the stage pins while scroll draws the route from cairn to cairn and
 * the active step's detail swaps in. Mobile and reduced motion: an ordinary stacked route.
 */
export function RouteScroll({ terrain, points, routeD }: { terrain: React.ReactNode; points: RoutePoint[]; routeD: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // reserve a little travel at the ends so the first and last states settle
  const draw = useTransform(scrollYProgress, [0.04, 0.9], [0.02, 1], { clamp: true });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(engagement.length - 1, Math.max(0, Math.floor(((v - 0.04) / 0.88) * engagement.length)));
    setActive((a) => (a === i ? a : i));
  });

  const stacked = <Stacked />;
  if (reduce) return stacked;

  return (
    <>
      <div className="lg:hidden">{stacked}</div>
      <div ref={ref} className="relative hidden h-[420vh] lg:block">
        <div className="sticky top-[var(--header-h)] flex h-[calc(100svh-var(--header-h))] items-center">
          <div className="mx-auto grid w-full max-w-[1320px] grid-cols-12 gap-8 px-10">
            <div className="col-span-5 flex flex-col justify-center">
              <h2 className="h2 text-white">How an engagement runs</h2>
              <p className="lede mt-4 max-w-md text-slate-ink">
                Five stages, the same on every test. You always know where we are on the route and what you will receive next.
              </p>
              <ol className="mt-10 space-y-1" aria-label="Engagement stages">
                {engagement.map((s, i) => (
                  <li key={s.step}>
                    <div
                      className={cn(
                        "grid grid-cols-[2.25rem_1fr] gap-3 rounded-[5px] px-3 py-3 transition-[background-color,opacity] duration-300 ease-[var(--ease-out)]",
                        i === active ? "bg-slate-2 opacity-100" : "opacity-55",
                      )}
                      aria-current={i === active ? "step" : undefined}
                    >
                      <span className={cn("coord pt-1", i <= active ? "text-trail-bright" : "text-slate-ink")}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[1.05rem] font-semibold text-white">
                          {s.step}: {s.title}
                        </p>
                        <div
                          className={cn(
                            "grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out)]",
                            i === active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                          )}
                        >
                          <p className="overflow-hidden text-[0.95rem] leading-relaxed text-slate-ink">
                            <span className="block pt-1.5">{s.body}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative col-span-7 h-[min(640px,calc(100svh-var(--header-h)-64px))] overflow-hidden rounded-[8px] border border-slate-rule bg-slate-2/40">
              <div className="absolute inset-0">{terrain}</div>
              <svg viewBox="0 0 800 560" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full" aria-hidden>
                <path d={routeD} fill="none" stroke="#3d505c" strokeWidth={2} strokeDasharray="4 7" />
                <motion.path
                  d={routeD}
                  fill="none"
                  stroke="var(--color-trail-bright)"
                  strokeWidth={3.5}
                  strokeLinecap="round"
                  style={{ pathLength: draw }}
                />
                {points.map((p, i) => (
                  <g key={i}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={i === active ? 17 : 12}
                      fill="#1e2b33"
                      stroke={i <= active ? "var(--color-trail-bright)" : "#56707e"}
                      strokeWidth={2}
                      style={{ transition: "r 300ms cubic-bezier(0.23,1,0.32,1), stroke 300ms" }}
                    />
                    <text
                      x={p.x}
                      y={p.y + 4}
                      textAnchor="middle"
                      fill={i <= active ? "#fff" : "#8aa0ab"}
                      style={{ font: "500 11px var(--font-mono)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </text>
                    <text x={p.x} y={p.y - 26} textAnchor="middle" fill={i <= active ? "#fff" : "#8aa0ab"} style={{ font: "600 14px var(--font-sans)" }}>
                      {engagement[i].step}
                    </text>
                  </g>
                ))}
              </svg>
              <div className="absolute inset-x-5 bottom-5">
                <div className="rounded-[6px] border border-slate-rule bg-slate/95 p-5">
                  <p className="coord text-slate-ink/75">
                    {engagement[active].coord} · stage {active + 1} of {engagement.length}
                  </p>
                  <p className="mt-2 text-[0.95rem] text-slate-ink">You get</p>
                  <p className="mt-0.5 text-lg font-semibold leading-snug text-white">{engagement[active].youGet}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Stacked() {
  return (
    <div className="mx-auto w-full max-w-[1320px] px-4 py-20 sm:px-6 lg:px-10">
      <h2 className="h2 text-white">How an engagement runs</h2>
      <p className="lede mt-4 max-w-xl text-slate-ink">
        Five stages, the same on every test. You always know where we are on the route and what you will receive next.
      </p>
      <ol className="relative mt-10 space-y-8 border-l-2 border-trail-bright/70 pl-7">
        {engagement.map((s, i) => (
          <li key={s.step} className="relative">
            <span className="absolute -left-[2.35rem] top-0.5 flex size-6 items-center justify-center rounded-full border-2 border-trail-bright bg-slate text-[0.65rem] font-semibold text-white">
              {i + 1}
            </span>
            <p className="text-lg font-semibold text-white">
              {s.step}: {s.title}
            </p>
            <p className="mt-1.5 leading-relaxed text-slate-ink">{s.body}</p>
            <p className="mt-3 rounded-[5px] border border-slate-rule bg-slate-2/60 p-3 text-[0.95rem] text-white">
              <span className="font-semibold">You get: </span>
              {s.youGet}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
