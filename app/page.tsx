"use client";

import { useI18n } from "@/lib/i18n";
import ConceptCard from "@/components/ConceptCard";

export default function Home() {
  const { t } = useI18n();
  const c = t.home.cards;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-20">
      <section className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          {t.home.heroKicker}
        </p>
        <h1 className="mt-5 font-display text-5xl font-medium leading-[1.05] tracking-tight text-ink text-balance sm:text-6xl">
          {t.home.heroTitle}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted text-pretty">
          {t.home.heroSubtitle}
        </p>
      </section>

      <section className="mt-20">
        <h2 className="border-b border-faint pb-3 text-xs font-medium uppercase tracking-[0.16em] text-muted">
          {t.home.conceptsHeading}
        </h2>
        <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          <ConceptCard
            title={c.abTest.title}
            description={c.abTest.description}
            badge={t.home.badgeInteractive}
            href="/ab-test"
          />
          <ConceptCard
            title={c.significance.title}
            description={c.significance.description}
            badge={t.home.badgeInteractive}
            href="/power"
          />
          <ConceptCard
            title={c.aiData.title}
            description={c.aiData.description}
            badge={t.home.badgeInteractive}
            href="/ai-data"
          />
          <ConceptCard
            title={c.causation.title}
            description={c.causation.description}
            badge={t.home.badgeInteractive}
            href="/causation"
          />
        </div>
      </section>
    </main>
  );
}
