import { contourRings } from "@/lib/contours";
import { Container } from "@/components/ui/primitives";
import { FindingCard } from "@/components/ui/FindingCard";
import { TerrainLayers } from "./TerrainLayers";
import { ScopingStarter } from "./ScopingStarter";
import { standards } from "@/lib/site";
import { getService } from "@/lib/services";

const backRings = [
  ...contourRings({ x: 640, y: 150, r: 330, rings: 16, seed: 11 }),
  ...contourRings({ x: 120, y: 560, r: 260, rings: 12, seed: 29 }),
];
const midRings = contourRings({ x: 380, y: 360, r: 250, rings: 13, seed: 7 });

// The tester's route: four cairns from the edge of the estate toward a finding.
const cairns = [
  { x: 190, y: 140, label: "Scope", sub: "app.example.com" },
  { x: 300, y: 285, label: "Recon", sub: "/api/v2 mapped" },
  { x: 440, y: 205, label: "Exploit", sub: "tenant boundary" },
  { x: 520, y: 345, label: "Finding", sub: "WEB-12 · high" },
];

function routePath(pts: { x: number; y: number }[]) {
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const mx = (a.x + b.x) / 2;
    d += ` C${mx},${a.y + 40} ${mx},${b.y - 40} ${b.x},${b.y}`;
  }
  return d;
}

function Rings({ rings, stroke, indexStroke, width = 1 }: { rings: { d: string; index: boolean }[]; stroke: string; indexStroke: string; width?: number }) {
  return (
    <svg viewBox="0 0 800 640" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      {rings.map((r, i) => (
        <path key={i} d={r.d} fill="none" stroke={r.index ? indexStroke : stroke} strokeWidth={r.index ? width * 1.6 : width} />
      ))}
    </svg>
  );
}

function GridTicks() {
  const xs = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <svg viewBox="0 0 800 640" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      {xs.map((i) => (
        <g key={i}>
          <line x1={i * 100} y1={0} x2={i * 100} y2={640} stroke="#14181a" strokeOpacity={0.06} />
          <text x={i * 100 + 6} y={630} fill="#586266" style={{ font: "10px var(--font-mono)" }}>
            {`E${(i * 100).toString().padStart(3, "0")}`}
          </text>
        </g>
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((j) => (
        <g key={j}>
          <line x1={0} y1={j * 100} x2={800} y2={j * 100} stroke="#14181a" strokeOpacity={0.06} />
          <text x={6} y={j * 100 - 6} fill="#586266" style={{ font: "10px var(--font-mono)" }}>
            {j ? `N${(j * 100).toString().padStart(3, "0")}` : ""}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function Hero() {
  const finding = getService("web-application-penetration-testing")!.sampleFinding;
  return (
    <section className="relative overflow-hidden border-b border-granite/10">
      <Container className="grid min-h-[calc(100svh-var(--header-h))] items-center gap-10 py-10 lg:grid-cols-12 lg:gap-6 lg:py-14">
        <div className="relative z-10 lg:col-span-6">
          <h1 className="display text-[clamp(2.6rem,1.4rem+3.2vw,4rem)]">
            Penetration testing for fintech and SaaS teams
          </h1>
          <p className="lede mt-6 max-w-xl">
            Human testers attack your applications, APIs and networks the way a real adversary would. You get exploitable
            findings with fixes, retesting included, and evidence your auditors and enterprise customers accept.
          </p>
          <div className="mt-8 max-w-xl">
            <ScopingStarter />
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.88rem] font-medium text-granite-2">
            {["Manual-first testing", "Retesting included", "NDA before scoping", "US and Europe"].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rotate-45 bg-trail" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative h-[360px] sm:h-[540px] lg:col-span-6 lg:h-[min(720px,calc(100svh-var(--header-h)-56px))]">
          <TerrainLayers
            back={<Rings rings={backRings} stroke="#9aaca3" indexStroke="#7d918a" width={0.9} />}
            mid={
              <>
                <GridTicks />
                <Rings rings={midRings} stroke="#8a9d95" indexStroke="#5f716a" width={1.1} />
              </>
            }
            routeD={routePath(cairns)}
            cairns={cairns}
            card={<FindingCard finding={finding} compact />}
          />
        </div>
        <FindingCard finding={finding} compact className="-mt-8 sm:hidden" />
      </Container>

      <div className="border-t border-granite/10 bg-stone-2/60">
        <Container className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-8">
          <p className="shrink-0 text-[0.85rem] font-semibold">Tested against public standards</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1.5">
            {standards.map((s) => (
              <li key={s.name} className="coord text-granite-2">
                {s.name}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
