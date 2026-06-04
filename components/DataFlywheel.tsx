"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";

const N_CYCLES = 12;
const MAX_K = 0.4;

/* ── Flywheel diagram ─────────────────────────────────────────── */
const CX = 150;
const CY = 150;
const R = 96; // node ring radius
const LR = 54; // label radius

const polar = (deg: number, r: number) => {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
};

// clockwise (screen): top → right → bottom → left
const NODES = [
  { key: "usage", angle: -90 },
  { key: "data", angle: 0 },
  { key: "model", angle: 90 },
  { key: "product", angle: 180 },
] as const;

function arc(fromAngle: number, toAngle: number): string {
  const inset = 18;
  const a = polar(fromAngle + inset, R);
  const b = polar(toAngle - inset, R);
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} A ${R} ${R} 0 0 1 ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

function FlywheelDiagram({
  stages,
  speed,
  speedLabel,
}: {
  stages: { usage: string; data: string; model: string; product: string };
  speed: number;
  speedLabel: string;
}) {
  const dur = speed > 0 ? Math.max(1.4, Math.min(20, 1.4 / speed)) : 0;
  const top = polar(-90, R);

  return (
    <svg viewBox="0 0 300 300" className="w-full h-auto" role="img" aria-label="Data flywheel">
      <defs>
        <marker id="fw-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 1 L8 5 L0 9 z" fill="var(--accent)" />
        </marker>
      </defs>

      {/* ring */}
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="currentColor" strokeOpacity={0.15} />

      {/* flow arrows between stages */}
      {NODES.map((n, i) => {
        const next = NODES[(i + 1) % NODES.length];
        return (
          <path
            key={n.key}
            d={arc(n.angle, next.angle + (i === NODES.length - 1 ? 360 : 0))}
            fill="none"
            stroke="var(--accent)"
            strokeOpacity={0.5}
            strokeWidth={1.5}
            markerEnd="url(#fw-arrow)"
          />
        );
      })}

      {/* nodes */}
      {NODES.map((n) => {
        const dot = polar(n.angle, R);
        const label = polar(n.angle, LR);
        return (
          <g key={n.key}>
            <circle cx={dot.x} cy={dot.y} r={4} fill="var(--accent)" />
            <text
              x={label.x}
              y={label.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={14}
              fontWeight={500}
              fill="currentColor"
            >
              {stages[n.key]}
            </text>
          </g>
        );
      })}

      {/* center readout */}
      <text x={CX} y={CY - 4} textAnchor="middle" fontSize={9} letterSpacing={1.5} fill="currentColor" fillOpacity={0.45}>
        {speedLabel.toUpperCase()}
      </text>
      <text x={CX} y={CY + 14} textAnchor="middle" fontSize={18} fontWeight={600} fill="currentColor">
        {Math.round(speed * 100)}%
      </text>

      {/* spinning indicator */}
      <g opacity={speed > 0 ? 1 : 0.3}>
        <circle cx={top.x} cy={top.y} r={9} fill="var(--accent)" fillOpacity={0.2} />
        <circle cx={top.x} cy={top.y} r={5} fill="var(--accent)" />
        {dur > 0 && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${CX} ${CY}`}
            to={`360 ${CX} ${CY}`}
            dur={`${dur}s`}
            repeatCount="indefinite"
          />
        )}
      </g>
    </svg>
  );
}

/* ── Compounding growth chart ─────────────────────────────────── */
const GW = 600;
const GH = 240;
const GPL = 38;
const GPR = 16;
const GPT = 16;
const GPB = 28;
const GPLOT_W = GW - GPL - GPR;
const GPLOT_H = GH - GPT - GPB;

function GrowthChart({
  values,
  withLabel,
  withoutLabel,
  finalText,
}: {
  values: number[];
  withLabel: string;
  withoutLabel: string;
  finalText: string;
}) {
  const yMax = Math.max(values[values.length - 1], 2);
  const xToPx = (t: number) => GPL + (t / N_CYCLES) * GPLOT_W;
  const yToPy = (v: number) => GPT + GPLOT_H - (v / yMax) * GPLOT_H;
  const baseY = yToPy(0);

  const line = values
    .map((v, t) => `${t === 0 ? "M" : "L"} ${xToPx(t).toFixed(1)} ${yToPy(v).toFixed(1)}`)
    .join(" ");
  const area = `${line} L ${xToPx(N_CYCLES).toFixed(1)} ${baseY.toFixed(1)} L ${xToPx(0).toFixed(1)} ${baseY.toFixed(1)} Z`;
  const refY = yToPy(1);
  const last = { x: xToPx(N_CYCLES), y: yToPy(values[N_CYCLES]) };
  const xticks = [0, 3, 6, 9, 12];

  return (
    <svg viewBox={`0 0 ${GW} ${GH}`} className="w-full h-auto" role="img" aria-label="Compounding growth chart">
      {/* baseline / axis */}
      <line x1={GPL} y1={baseY} x2={GW - GPR} y2={baseY} stroke="currentColor" strokeOpacity={0.2} />

      {/* "without flywheel" reference at value = 1 */}
      <line x1={GPL} y1={refY} x2={GW - GPR} y2={refY} stroke="currentColor" strokeOpacity={0.3} strokeDasharray="4 3" />
      <text x={GW - GPR} y={refY - 6} textAnchor="end" fontSize={10} fill="currentColor" fillOpacity={0.45}>
        {withoutLabel}
      </text>

      {/* x ticks */}
      {xticks.map((t) => (
        <g key={t}>
          <line x1={xToPx(t)} y1={baseY} x2={xToPx(t)} y2={baseY + 4} stroke="currentColor" strokeOpacity={0.3} />
          <text x={xToPx(t)} y={baseY + 18} textAnchor="middle" fontSize={10} fill="currentColor" fillOpacity={0.45}>
            {t}
          </text>
        </g>
      ))}

      {/* compounding curve */}
      <path d={area} fill="var(--accent)" fillOpacity={0.12} />
      <path d={line} fill="none" stroke="var(--accent)" strokeWidth={2} />

      {/* final point */}
      <circle cx={last.x} cy={last.y} r={4} fill="var(--accent)" />
      <text x={last.x - 8} y={Math.max(last.y - 10, 14)} textAnchor="end" fontSize={12} fontWeight={600} fill="var(--accent)">
        {finalText}
      </text>
      <text x={GPL} y={GPT + 4} fontSize={10} fill="var(--accent)" fillOpacity={0.8}>
        {withLabel}
      </text>
    </svg>
  );
}

/* ── Slider ───────────────────────────────────────────────────── */
function Slider({
  id,
  label,
  hint,
  value,
  display,
  onChange,
}: {
  id: string;
  label: string;
  hint: string;
  value: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm text-ink">
          {label}
        </label>
        <span className="font-mono text-sm tabular-nums text-ink">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-ink"
      />
      <p className="text-xs leading-relaxed text-muted">{hint}</p>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────────── */
export default function DataFlywheel() {
  const { t, lang } = useI18n();
  const a = t.aiData;
  const [loopStrength, setLoopStrength] = useState(60);
  const [dataQuality, setDataQuality] = useState(80);

  const { speed, values, finalMultiple, doubling } = useMemo(() => {
    const sp = (loopStrength / 100) * (dataQuality / 100);
    const k = MAX_K * sp;
    const vals = Array.from({ length: N_CYCLES + 1 }, (_, t) => (1 + k) ** t);
    return {
      speed: sp,
      values: vals,
      finalMultiple: vals[N_CYCLES],
      doubling: k > 0 ? Math.log(2) / Math.log(1 + k) : Infinity,
    };
  }, [loopStrength, dataQuality]);

  const locale = lang === "pt" ? "pt-BR" : "en-US";
  const num = (v: number, d = 1) =>
    v.toLocaleString(locale, { minimumFractionDigits: d, maximumFractionDigits: d });

  const verdict =
    finalMultiple >= 3 ? a.verdictStrong : finalMultiple >= 1.5 ? a.verdictWeak : a.verdictStalled;
  const verdictColor =
    finalMultiple >= 3 ? "border-positive text-positive" : finalMultiple >= 1.5 ? "border-accent text-accent" : "border-negative text-negative";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      {/* Controls + diagram */}
      <section className="rounded-lg border border-faint bg-surface p-6">
        <div className="text-accent">
          <FlywheelDiagram stages={a.stages} speed={speed} speedLabel={a.speedLabel} />
        </div>
        <div className="mt-6 flex flex-col gap-6">
          <Slider
            id="loop-strength"
            label={a.loopStrengthLabel}
            hint={a.loopStrengthHint}
            value={loopStrength}
            display={`${loopStrength}%`}
            onChange={setLoopStrength}
          />
          <Slider
            id="data-quality"
            label={a.dataQualityLabel}
            hint={a.dataQualityHint}
            value={dataQuality}
            display={`${dataQuality}%`}
            onChange={setDataQuality}
          />
        </div>
      </section>

      {/* Results */}
      <section className="flex flex-col gap-7">
        <div className={"border-l-2 pl-5 " + verdictColor}>
          <div className="font-display text-2xl font-medium">{verdict}</div>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-faint bg-faint">
          <div className="bg-paper px-4 py-3.5">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
              {a.multiplierLabel}
            </span>
            <div className="mt-1 font-mono text-2xl tabular-nums text-ink">{num(finalMultiple, 1)}×</div>
          </div>
          <div className="bg-paper px-4 py-3.5">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
              {a.doublingLabel}
            </span>
            <div className="mt-1 font-mono text-2xl tabular-nums text-ink">
              {Number.isFinite(doubling) ? `${num(doubling, 1)} ${a.cyclesUnit}` : a.doublingNever}
            </div>
          </div>
        </div>

        <div className="text-ink">
          <GrowthChart
            values={values}
            withLabel={a.chartWithFlywheel}
            withoutLabel={a.chartWithoutFlywheel}
            finalText={`${num(finalMultiple, 1)}×`}
          />
        </div>
      </section>
    </div>
  );
}
