"use client";

import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-faint">
      <div className="mx-auto flex w-full max-w-5xl items-baseline justify-between gap-4 px-6 py-10">
        <p className="font-display text-sm italic text-ink">{t.nav.siteTitle}</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          pt · en — mmxxvi
        </p>
      </div>
    </footer>
  );
}
