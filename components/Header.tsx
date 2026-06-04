"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  const { t } = useI18n();
  const pathname = usePathname();

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/ab-test", label: t.nav.abTest },
    { href: "/power", label: t.nav.power },
    { href: "/causation", label: t.nav.causation },
    { href: "/ai-data", label: t.nav.aiData },
  ];

  return (
    <header className="sticky top-0 z-10 border-b border-faint bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="font-display text-lg font-medium tracking-tight text-ink"
        >
          {t.nav.siteTitle}
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={
                  "transition-colors " +
                  (active
                    ? "text-ink"
                    : "text-muted hover:text-ink")
                }
              >
                {l.label}
              </Link>
            );
          })}
          <span className="h-4 w-px bg-faint" aria-hidden />
          <LanguageToggle />
        </nav>
      </div>
    </header>
  );
}
