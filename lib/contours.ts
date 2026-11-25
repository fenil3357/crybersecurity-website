// Deterministic topographic contour generator. Runs at build time (server components),
// so the shipped page carries plain SVG paths and no runtime cost.

type Peak = { x: number; y: number; r: number; rings: number; seed: number };

function rand(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function smoothClosed(points: [number, number][]) {
  // Catmull-Rom to cubic bezier, closed loop
  const n = points.length;
  let d = `M${points[0][0].toFixed(1)},${points[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d + "Z";
}

export function contourRings(peak: Peak) {
  const r = rand(peak.seed);
  const a1 = 0.08 + r() * 0.1;
  const a2 = 0.04 + r() * 0.06;
  const a3 = 0.02 + r() * 0.04;
  const p1 = r() * Math.PI * 2;
  const p2 = r() * Math.PI * 2;
  const p3 = r() * Math.PI * 2;
  const stretch = 0.75 + r() * 0.5;
  const paths: { d: string; index: boolean }[] = [];
  for (let k = 1; k <= peak.rings; k++) {
    const t = k / peak.rings;
    const radius = peak.r * t;
    const pts: [number, number][] = [];
    const steps = 36;
    for (let i = 0; i < steps; i++) {
      const th = (i / steps) * Math.PI * 2;
      // outer rings wobble more than inner ones, like real terrain
      const wob =
        1 +
        a1 * t * Math.sin(2 * th + p1 + t * 1.3) +
        a2 * Math.sin(3 * th + p2 - t) +
        a3 * t * Math.sin(5 * th + p3);
      pts.push([peak.x + Math.cos(th) * radius * wob * stretch, peak.y + Math.sin(th) * radius * wob]);
    }
    paths.push({ d: smoothClosed(pts), index: k % 5 === 0 });
  }
  return paths;
}

export function terrain(peaks: Peak[]) {
  return peaks.flatMap((p) => contourRings(p));
}
