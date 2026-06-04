"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useI18n } from "@/lib/i18n";
import { twoProportionZTest } from "@/lib/stats";
import NullDistributionChart from "./NullDistributionChart";

const ALPHAS = [0.1, 0.05, 0.01] as const;

interface SliderProps {
  id: string;
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}

function Slider({ id, label, hint, value, min, max, step, display, onChange }: SliderProps) {
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

function Label({ children }: { children: ReactNode }) {
  return (
    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
      {children}
    </span>
  );
}

function StatTile({ label, value, sub }: { label: string; value: ReactNode; sub?: string }) {
  return (
    <div className="bg-paper px-4 py-3.5">
      <Label>{label}</Label>
      <div className="mt-1 font-mono text-lg tabular-nums text-ink">{value}</div>
      {sub && <div className="text-xs text-muted">{sub}</div>}
    </div>
  );
}

export default function ABTestSimulator() {
  const { t, lang } = useI18n();
  const [baseline, setBaseline] = useState(10); // percent
  const [variant, setVariant] = useState(12); // percent
  const [sampleSize, setSampleSize] = useState(2000); // per group
  const [alpha, setAlpha] = useState<number>(0.05);

  const result = useMemo(
    () => twoProportionZTest(baseline / 100, variant / 100, sampleSize, sampleSize, alpha),
    [baseline, variant, sampleSize, alpha],
  );

  const locale = lang === "pt" ? "pt-BR" : "en-US";
  const num = (v: number, d = 2) =>
    v.toLocaleString(locale, { minimumFractionDigits: d, maximumFractionDigits: d });
  const int = (v: number) => v.toLocaleString(locale);
  const signed = (v: number, d = 2) => `${v >= 0 ? "+" : ""}${num(v, d)}`;

  const pValueText = result.pValue < 0.0001 ? "< 0.0001" : num(result.pValue, 4);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      {/* Controls */}
      <section className="rounded-lg border border-faint bg-surface p-6">
        <h2 className="mb-5">
          <Label>{t.abTest.controlsHeading}</Label>
        </h2>
        <div className="flex flex-col gap-6">
          <Slider
            id="baseline"
            label={t.abTest.baselineLabel}
            hint={t.abTest.baselineHint}
            value={baseline}
            min={1}
            max={50}
            step={0.5}
            display={`${num(baseline, 1)}%`}
            onChange={setBaseline}
          />
          <Slider
            id="variant"
            label={t.abTest.variantLabel}
            hint={t.abTest.variantHint}
            value={variant}
            min={1}
            max={50}
            step={0.5}
            display={`${num(variant, 1)}%`}
            onChange={setVariant}
          />
          <Slider
            id="sample"
            label={t.abTest.sampleSizeLabel}
            hint={t.abTest.sampleSizeHint}
            value={sampleSize}
            min={100}
            max={50000}
            step={100}
            display={`${int(sampleSize)} ${t.abTest.perGroup}`}
            onChange={setSampleSize}
          />
          <div className="flex flex-col gap-2">
            <span className="text-sm text-ink">{t.abTest.alphaLabel}</span>
            <div className="inline-flex w-fit overflow-hidden rounded-md border border-faint">
              {ALPHAS.map((a, i) => {
                const active = alpha === a;
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAlpha(a)}
                    aria-pressed={active}
                    className={
                      "px-3.5 py-1.5 font-mono text-sm transition-colors " +
                      (i > 0 ? "border-l border-faint " : "") +
                      (active
                        ? "bg-ink text-paper"
                        : "text-muted hover:bg-ink/5 hover:text-ink")
                    }
                  >
                    {a.toFixed(2)}
                  </button>
                );
              })}
            </div>
            <p className="text-xs leading-relaxed text-muted">{t.abTest.alphaHint}</p>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="flex flex-col gap-7">
        <div
          className={
            "border-l-2 pl-5 " +
            (result.significant ? "border-positive" : "border-negative")
          }
        >
          <div
            className={
              "font-display text-2xl font-medium " +
              (result.significant ? "text-positive" : "text-negative")
            }
          >
            {result.significant
              ? t.abTest.verdictSignificant
              : t.abTest.verdictNotSignificant}
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            {result.significant
              ? t.abTest.verdictSignificantSub
              : t.abTest.verdictNotSignificantSub}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-faint bg-faint sm:grid-cols-3">
          <StatTile label={t.abTest.pValue} value={pValueText} />
          <StatTile label={t.abTest.zScore} value={num(result.z, 2)} />
          <StatTile label={t.abTest.relativeLift} value={`${signed(result.relativeLift * 100, 1)}%`} />
          <StatTile label={t.abTest.observedDiff} value={`${signed(result.diff * 100)} pp`} />
          <StatTile
            label={t.abTest.confidenceInterval}
            value={`[${num(result.ciLow * 100)}, ${num(result.ciHigh * 100)}]`}
            sub={`pp · ${num((1 - alpha) * 100, 0)}%`}
          />
          <StatTile
            label={t.abTest.conversionsVariant}
            value={int(result.x2)}
            sub={`${t.abTest.conversionsControl}: ${int(result.x1)}`}
          />
        </div>

        <div>
          <h3 className="mb-3">
            <Label>{t.abTest.chartHeading}</Label>
          </h3>
          <div className="text-ink">
            <NullDistributionChart
              z={result.z}
              zCrit={result.zCrit}
              significant={result.significant}
              observedLabel={t.abTest.chartObserved}
              criticalLabel={t.abTest.chartCritical}
            />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted">{t.abTest.chartCaption}</p>
        </div>
      </section>
    </div>
  );
}
