"use client";

import { useI18n } from "@/lib/i18n";
import DataFlywheel from "@/components/DataFlywheel";
import ConceptPager from "@/components/ConceptPager";

export default function AiDataPage() {
  const { t } = useI18n();
  const a = t.aiData;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-14">
      <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-muted">
        <span className="font-mono tabular-nums text-accent">04 / 04</span>
        <span className="h-px w-6 bg-faint" aria-hidden />
        {t.home.badgeInteractive}
      </p>
      <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
        {a.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted text-pretty">
        {a.intro}
      </p>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-medium text-ink">{a.flywheelHeading}</h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted text-pretty">
          {a.flywheelIntro}
        </p>
        <div className="mt-8">
          <DataFlywheel />
        </div>
      </section>

      <section className="mt-16 border-t border-faint pt-10">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-3">
          {a.sections.map((s, i) => (
            <article key={i} className="flex flex-col gap-3 border-t border-ink/25 pt-5">
              <span className="text-[11px] uppercase tracking-[0.16em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl leading-snug text-ink">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <ConceptPager />
    </main>
  );
}
