"use client";

import { useI18n } from "@/lib/i18n";
import PowerSimulator from "@/components/PowerSimulator";
import ConceptPager from "@/components/ConceptPager";

export default function PowerPage() {
  const { t } = useI18n();
  const p = t.power;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-14">
      <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-muted">
        <span className="font-mono tabular-nums text-accent">02 / 04</span>
        <span className="h-px w-6 bg-faint" aria-hidden />
        {t.home.badgeInteractive}
      </p>
      <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
        {p.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{p.intro}</p>

      <div className="mt-12">
        <PowerSimulator />
      </div>

      <section className="mt-14 border-t border-faint pt-8">
        <h2 className="font-display text-2xl font-medium text-ink">{p.explanationHeading}</h2>
        <ul className="mt-5 flex flex-col gap-4">
          {p.explanation.map((para, i) => (
            <li key={i} className="flex gap-4 text-[15px] leading-relaxed text-muted">
              <span className="mt-2 h-px w-5 shrink-0 bg-accent" aria-hidden />
              <span>{para}</span>
            </li>
          ))}
        </ul>
      </section>

      <ConceptPager />
    </main>
  );
}
