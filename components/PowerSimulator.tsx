"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useI18n } from "@/lib/i18n";
import { achievedPower, requiredSampleSize } from "@/lib/stats";
import PowerDistributionsChart from "./PowerDistributionsChart";

const ALPHAS = [0.1, 0.05, 0.01] as const;
const POWERS = [0.8, 0.9, 0.95] as const;

function Slider({
  id,
  label,
  hint,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  id: string;
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
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
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-ink"
      />
      <p className="text-xs leading-relaxed text-muted">{hint}</p>
    </div>
  );
}

function Segmented({
  label,
  hint,
  options,
  value,
  onChange,
  format,
}: {
  label: string;
  hint: string;
  options: readonly number[];
  value: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-ink">{label}</span>
      <div className="inline-flex w-fit overflow-hidden rounded-md border border-faint">
        {options.map((o, i) => {
          const active = value === o;
          return (
            <button
              key={o}
              type="button"
              onClick={() => onChange(o)}
              aria-pressed={active}
              className={
                "px-3.5 py-1.5 font-mono text-sm transition-colors " +
                (i > 0 ? "border-l border-faint " : "") +
                (active ? "bg-ink text-paper" : "text-muted hover:bg-ink/5 hover:text-ink")
              }
            >
              {format(o)}
            </button>
          );
        })}
      </div>
      <p className="text-xs leading-relaxed text-muted">{hint}</p>
    </div>
  );
}

function StatTile({ label, value, sub }: { label: string; value: ReactNode; sub?: string }) {
  return (
    <div className="bg-paper px-4 py-3.5">
      <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">{label}</span>
      <div className="mt-1 font-mono text-lg tabular-nums text-ink">{value}</div>
      {sub && <div className="text-xs text-muted">{sub}</div>}
    </div>
  );
}

export default function PowerSimulator() {
  const { t, lang } = useI18n();
  const p = t.power;
  const [baseline, setBaseline] = useState(10); // %
  const [mde, setMde] = useState(20); // relative lift %
  const [alpha, setAlpha] = useState<number>(0.05);
  const [sampleSize, setSampleSize] = useState(2000); // per group
  const [targetPower, setTargetPower] = useState<number>(0.8);

  const r = useMemo(() => {
    const p1 = baseline / 100;
    const p2 = Math.min(p1 * (1 + mde / 100), 0.99);
    const required = requiredSampleSize(p1, p2, alpha, targetPower);
    const { power, lambda, zCrit } = achievedPower(p1, p2, sampleSize, alpha);
    return { p1, p2, required, power, lambda, zCrit };
  }, [baseline, mde, alpha, sampleSize, targetPower]);

  const locale = lang === "pt" ? "pt-BR" : "en-US";
  const int = (v: number) => v.toLocaleString(locale);
  const pct = (v: number, d = 1) =>
    `${v.toLocaleString(locale, { minimumFractionDigits: d, maximumFractionDigits: d })}%`;

  const wellPowered = r.power >= targetPower;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      {/* Controls */}
      <section className="rounded-lg border border-faint bg-surface p-6">
        <h2 className="mb-5">
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            {p.controlsHeading}
          </span>
        </h2>
        <div className="flex flex-col gap-6">
          <Slider
            id="pw-baseline"
            label={p.baselineLabel}
            hint={p.baselineHint}
            value={baseline}
            min={1}
            max={50}
            step={0.5}
            display={pct(baseline)}
            onChange={setBaseline}
          />
          <Slider
            id="pw-mde"
            label={p.mdeLabel}
            hint={p.mdeHint}
            value={mde}
            min={1}
            max={50}
            step={1}
            display={`+${int(mde)}%`}
            onChange={setMde}
          />
          <Slider
            id="pw-n"
            label={p.sampleSizeLabel}
            hint={p.sampleSizeHint}
            value={sampleSize}
            min={100}
            max={50000}
            step={100}
            display={`${int(sampleSize)} ${p.perGroup}`}
            onChange={setSampleSize}
          />
          <Segmented
            label={p.alphaLabel}
            hint={p.alphaHint}
            options={ALPHAS}
            value={alpha}
            onChange={setAlpha}
            format={(v) => v.toFixed(2)}
          />
          <Segmented
            label={p.targetPowerLabel}
            hint={p.targetPowerHint}
            options={POWERS}
            value={targetPower}
            onChange={setTargetPower}
            format={(v) => `${Math.round(v * 100)}%`}
          />
        </div>
      </section>

      {/* Results */}
      <section className="flex flex-col gap-7">
        <div className={"border-l-2 pl-5 " + (wellPowered ? "border-positive text-positive" : "border-negative text-negative")}>
          <div className="font-display text-2xl font-medium">
            {wellPowered ? p.verdictWellPowered : p.verdictUnderpowered}
          </div>
          <p className="mt-1.5 text-sm text-muted">
            {p.detectingLabel}: {pct(r.p1 * 100)} → {pct(r.p2 * 100)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-faint bg-faint sm:grid-cols-3">
          <StatTile label={p.achievedPowerLabel} value={pct(r.power * 100, 1)} />
          <StatTile
            label={p.requiredNLabel}
            value={Number.isFinite(r.required) ? int(r.required) : "∞"}
          />
          <StatTile
            label={p.totalNLabel}
            value={Number.isFinite(r.required) ? int(r.required * 2) : "∞"}
          />
        </div>

        <div>
          <h3 className="mb-3">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
              {p.chartHeading}
            </span>
          </h3>
          <div className="text-ink">
            <PowerDistributionsChart
              lambda={r.lambda}
              zCrit={r.zCrit}
              labels={{
                power: p.chartLegendPower,
                alpha: p.chartLegendAlpha,
                beta: p.chartLegendBeta,
                h0: p.chartH0,
                h1: p.chartH1,
              }}
            />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted">{p.chartCaption}</p>
        </div>
      </section>
    </div>
  );
}
