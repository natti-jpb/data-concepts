"use client";

import { Fragment } from "react";
import { useI18n } from "@/lib/i18n";
import type { Lang } from "@/lib/dictionary";

const OPTIONS: Lang[] = ["pt", "en"];

export default function LanguageToggle() {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.nav.langLabel}
      className="flex items-center gap-1.5 text-xs uppercase tracking-wide"
    >
      {OPTIONS.map((opt, i) => {
        const active = lang === opt;
        return (
          <Fragment key={opt}>
            {i > 0 && <span className="text-faint" aria-hidden>/</span>}
            <button
              type="button"
              onClick={() => setLang(opt)}
              aria-pressed={active}
              className={
                "transition-colors " +
                (active ? "text-ink" : "text-muted/70 hover:text-ink")
              }
            >
              {opt}
            </button>
          </Fragment>
        );
      })}
    </div>
  );
}
