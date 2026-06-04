"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";

/* deterministic, seeded base cloud so points stay stable across renders */
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const N = 120;
const SEP = 1.7;
const GROUP_COLORS = ["var(--accent)", "var(--positive)", "var(--negative)"];

const BASE = (() => {
  const rnd = mulberry32(20260531);
  const gauss = () => {
    let u = 0;
    let v = 0;
    while (u === 0) u = rnd();
    while (v === 0) v = rnd();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  return Array.from({ length: N }, (_, i) => ({
    group: i % 3,
    nx: gauss() * 0.7,
    ny: gauss() * 0.7,
  }));
})();

function pearson(pts: { x: number; y: number }[]): number {
  const n = pts.length;
  if (n < 2) return 0;
  let mx = 0;
  let my = 0;
  for (const p of pts) {
    mx += p.x;
    my += p.y;
  }
  mx /= n;
  my /= n;
  let cov = 0;
  let vx = 0;
  let vy = 0;
  for (const p of pts) {
    const dx = p.x - mx;
    const dy = p.y - my;
    cov += dx * dy;
    vx += dx * dx;
    vy += dy * dy;
  }
  const den = Math.sqrt(vx * vy);
  return den === 0 ? 0 : cov / den;
}

/* chart geometry */
const W = 440;
const H = 360;
const PL = 40;
const PR = 16;
const PT = 16;
const PB = 44;
const PLOT_W = W - PL - PR;
const PLOT_H = H - PT - PB;
const D = 4.6; // domain half-width
const xToPx = (x: number) => PL + ((x + D) / (2 * D)) * PLOT_W;
const yToPy = (y: number) => PT + PLOT_H - ((y + D) / (2 * D)) * PLOT_H;

export default function CorrelationScatter() {
  const { t } = useI18n();
  const c = t.causation;
  const [confounder, setConfounder] = useState(70); // %
  const [reveal, setReveal] = useState(false);

  const { points, rAll, rWithin } = useMemo(() => {
    const s = confounder / 100;
    const pts = BASE.map((b) => ({
      x: (b.group - 1) * s * SEP + b.nx,
      y: (b.group - 1) * s * SEP + b.ny,
      group: b.group,
    }));
    const rAllv = pearson(pts);
    const groups = [0, 1, 2].map((g) => pts.filter((p) => p.group === g));
    const rWithinv = groups.reduce((acc, g) => acc + pearson(g), 0) / groups.length;
    return { points: pts, rAll: rAllv, rWithin: rWithinv };
  }, [confounder]);

  // aggregate regression line (in data space), clipped to domain
  const reg = useMemo(() => {
    const n = points.length;
    let mx = 0;
    let my = 0;
    for (const p of points) {
      mx += p.x;
      my += p.y;
    }
    mx /= n;
    my /= n;
    let cov = 0;
    let vx = 0;
    for (const p of points) {
      cov += (p.x - mx) * (p.y - my);
      vx += (p.x - mx) ** 2;
    }
    const slope = vx === 0 ? 0 : cov / vx;
    const intercept = my - slope * mx;
    const clamp = (y: number) => Math.max(-D, Math.min(D, y));
    return {
      x1: -D,
      y1: clamp(slope * -D + intercept),
      x2: D,
      y2: clamp(slope * D + intercept),
    };
  }, [points]);

  const num = (v: number) => v.toFixed(2);
  const spurious = rAll >= 0.45 && Math.abs(rWithin) < 0.25;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* Controls */}
      <section className="rounded-lg border border-faint bg-surface p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="confounder" className="text-sm text-ink">
                {c.confounderLabel}
              </label>
              <span className="font-mono text-sm tabular-nums text-ink">{confounder}%</span>
            </div>
            <input
              id="confounder"
              type="range"
              min={0}
              max={100}
              step={1}
              value={confounder}
              onChange={(e) => setConfounder(Number(e.target.value))}
              className="w-full accent-ink"
            />
            <p className="text-xs leading-relaxed text-muted">{c.confounderHint}</p>
          </div>

          <label className="flex cursor-pointer items-center gap-3 text-sm text-ink">
            <input
              type="checkbox"
              checked={reveal}
              onChange={(e) => setReveal(e.target.checked)}
              className="h-4 w-4 accent-ink"
            />
            {c.revealLabel}
          </label>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-faint bg-faint">
            <div className="bg-paper px-4 py-3.5">
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                {c.aggregateRLabel}
              </span>
              <div className="mt-1 font-mono text-xl tabular-nums text-ink">{num(rAll)}</div>
            </div>
            <div className="bg-paper px-4 py-3.5">
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                {c.withinRLabel}
              </span>
              <div className="mt-1 font-mono text-xl tabular-nums text-ink">{num(rWithin)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Scatter + verdict */}
      <section className="flex flex-col gap-6">
        <div className={"border-l-2 pl-5 " + (spurious ? "border-negative text-negative" : "border-accent text-accent")}>
          <div className="font-display text-2xl font-medium">
            {spurious ? c.verdictSpurious : c.verdictNeutral}
          </div>
        </div>

        <div className="text-ink">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Correlation scatter">
            {/* axes */}
            <line x1={PL} y1={PT} x2={PL} y2={PT + PLOT_H} stroke="currentColor" strokeOpacity={0.25} />
            <line x1={PL} y1={PT + PLOT_H} x2={PL + PLOT_W} y2={PT + PLOT_H} stroke="currentColor" strokeOpacity={0.25} />

            {/* regression line */}
            <line
              x1={xToPx(reg.x1)}
              y1={yToPy(reg.y1)}
              x2={xToPx(reg.x2)}
              y2={yToPy(reg.y2)}
              stroke="currentColor"
              strokeOpacity={0.35}
              strokeDasharray="5 4"
            />

            {/* points */}
            {points.map((p, i) => (
              <circle
                key={i}
                cx={xToPx(p.x)}
                cy={yToPy(p.y)}
                r={3.5}
                fill={reveal ? GROUP_COLORS[p.group] : "var(--accent)"}
                fillOpacity={reveal ? 0.85 : 0.55}
              />
            ))}

            {/* axis labels */}
            <text x={PL + PLOT_W / 2} y={H - 22} textAnchor="middle" fontSize={12} fill="currentColor" fillOpacity={0.6}>
              {c.xAxisLabel}
            </text>
            <text
              x={14}
              y={PT + PLOT_H / 2}
              textAnchor="middle"
              fontSize={12}
              fill="currentColor"
              fillOpacity={0.6}
              transform={`rotate(-90 14 ${PT + PLOT_H / 2})`}
            >
              {c.yAxisLabel}
            </text>

            {/* legend when revealed */}
            {reveal && (
              <text x={PL + PLOT_W} y={H - 6} textAnchor="end" fontSize={11} fill="currentColor" fillOpacity={0.6}>
                {c.legendGroups}
              </text>
            )}
          </svg>
        </div>
      </section>
    </div>
  );
}
