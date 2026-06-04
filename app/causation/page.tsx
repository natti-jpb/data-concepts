"use client";

import { useI18n } from "@/lib/i18n";
import CorrelationScatter from "@/components/CorrelationScatter";

export default function CausationPage() {
  const { t } = useI18n();
  const c = t.causation;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-14">
      <h1 className="font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
        {c.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{c.intro}</p>

      <div className="mt-12">
        <CorrelationScatter />
      </div>

      <section className="mt-14 border-t border-faint pt-8">
        <h2 className="font-display text-2xl font-medium text-ink">{c.explanationHeading}</h2>
        <ul className="mt-5 flex flex-col gap-4">
          {c.explanation.map((para, i) => (
            <li key={i} className="flex gap-4 text-[15px] leading-relaxed text-muted">
              <span className="mt-2 h-px w-5 shrink-0 bg-accent" aria-hidden />
              <span>{para}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
