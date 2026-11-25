"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

type Cairn = { x: number; y: number; label: string; sub: string };

/**
 * Three independent planes (back terrain, mid terrain + grid, front route) that move at different
 * rates on scroll and follow the pointer with a damped spring. Static and fully composed under
 * reduced motion or touch.
 */
export function TerrainLayers({
  back,
  mid,
  routeD,
  cairns,
  card,
}: {
  back: React.ReactNode;
  mid: React.ReactNode;
  routeD: string;
  cairns: Cairn[];
  card: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 60, damping: 18, mass: 0.6 });

  const backY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const frontY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const backX = useTransform(sx, (v) => v * 6);
  const midX = useTransform(sx, (v) => v * 12);
  const frontX = useTransform(sx, (v) => v * 20);
  const backPY = useTransform(sy, (v) => v * 5);
  const midPY = useTransform(sy, (v) => v * 10);
  const frontPY = useTransform(sy, (v) => v * 16);
  const backTY = useTransform(() => backY.get() + backPY.get());
  const midTY = useTransform(() => midY.get() + midPY.get());
  const frontTY = useTransform(() => frontY.get() + frontPY.get());

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
      py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, px, py]);

  const still = !!reduce;

  return (
    <div ref={ref} className="relative h-full w-full" aria-hidden>
      <motion.div className="absolute inset-0" style={still ? undefined : { x: backX, y: backTY }}>
        {back}
      </motion.div>
      <motion.div className="absolute inset-0" style={still ? undefined : { x: midX, y: midTY }}>
        {mid}
      </motion.div>
      <motion.div className="absolute inset-0" style={still ? undefined : { x: frontX, y: frontTY }}>
        <svg viewBox="0 0 800 640" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          {/* route casing keeps the red legible over contours */}
          <motion.path
            d={routeD}
            fill="none"
            stroke="#e9ece6"
            strokeWidth={9}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.85}
            initial={still ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1], delay: 0.35 }}
          />
          <motion.path
            d={routeD}
            fill="none"
            stroke="var(--color-trail)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1 0"
            initial={still ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1], delay: 0.35 }}
          />
          {cairns.map((c, i) => (
            <motion.g
              key={c.label}
              initial={still ? false : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1], delay: 0.5 + i * 0.42 }}
              style={{ transformOrigin: `${c.x}px ${c.y}px`, transformBox: "view-box" }}
            >
              <circle cx={c.x} cy={c.y} r={13} fill="#e9ece6" stroke="var(--color-trail)" strokeWidth={2} />
              <path
                d={`M${c.x - 6},${c.y + 4} h12 M${c.x - 4},${c.y} h8 M${c.x - 2.2},${c.y - 4} h4.4`}
                stroke="var(--color-granite)"
                strokeWidth={2.2}
                strokeLinecap="round"
              />
              <text x={c.x + 20} y={c.y - 3} className="fill-granite" stroke="#e9ece6" strokeWidth={4} paintOrder="stroke" strokeLinejoin="round" style={{ font: "600 13px var(--font-sans)" }}>
                {c.label}
              </text>
              <text x={c.x + 20} y={c.y + 13} className="fill-granite-2" stroke="#e9ece6" strokeWidth={4} paintOrder="stroke" strokeLinejoin="round" style={{ font: "11px var(--font-mono)" }}>
                {c.sub}
              </text>
            </motion.g>
          ))}
        </svg>
        <motion.div
          className="absolute bottom-[6%] right-[3%] hidden w-[min(300px,62%)] sm:block"
          initial={still ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 2.1 }}
        >
          {card}
        </motion.div>
      </motion.div>
    </div>
  );
}
