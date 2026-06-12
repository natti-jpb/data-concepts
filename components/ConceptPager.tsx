"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";

export const CONCEPT_ORDER = ["/ab-test", "/power", "/causation", "/ai-data"] as const;

function PagerLink({
  href,
  kicker,
  title,
  align,
}: {
  href: string;
  kicker: string;
  title: string;
  align: "left" | "right";
}) {
  const right = align === "right";
  return (
    <Link
      href={href}
      className={
        "group flex flex-col gap-1.5 py-1 " + (right ? "items-end text-right" : "items-start")
      }
    >
      <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted transition-colors group-hover:text-accent">
        {right ? `${kicker} →` : `← ${kicker}`}
      </span>
      <span className="font-display text-lg leading-snug text-ink transition-colors group-hover:text-accent">
        {title}
      </span>
    </Link>
  );
}

export default function ConceptPager() {
  const { t } = useI18n();
  const pathname = usePathname();
  const idx = CONCEPT_ORDER.indexOf(pathname as (typeof CONCEPT_ORDER)[number]);
  if (idx === -1) return null;

  const labels: Record<(typeof CONCEPT_ORDER)[number], string> = {
    "/ab-test": t.nav.abTest,
    "/power": t.nav.power,
    "/causation": t.nav.causation,
    "/ai-data": t.nav.aiData,
  };

  const prev = idx > 0 ? CONCEPT_ORDER[idx - 1] : null;
  const next = idx < CONCEPT_ORDER.length - 1 ? CONCEPT_ORDER[idx + 1] : null;

  return (
    <nav
      aria-label={t.home.conceptsHeading}
      className="mt-20 grid grid-cols-2 gap-6 border-t border-faint pt-7"
    >
      <PagerLink
        href={prev ?? "/"}
        kicker={prev ? t.nav.previous : t.nav.backToIndex}
        title={prev ? labels[prev] : t.nav.home}
        align="left"
      />
      <PagerLink
        href={next ?? "/"}
        kicker={next ? t.nav.next : t.nav.backToIndex}
        title={next ? labels[next] : t.nav.home}
        align="right"
      />
    </nav>
  );
}
