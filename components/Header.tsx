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
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-6 py-4">
        <Link
          href="/"
          className="font-display text-lg font-medium italic tracking-tight text-ink transition-colors hover:text-accent"
        >
          {t.nav.siteTitle}
        </Link>
        <nav className="no-scrollbar flex items-center gap-5 overflow-x-auto whitespace-nowrap text-sm">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={
                  "py-1 transition-colors " +
                  (active
                    ? "text-ink underline decoration-accent decoration-[1.5px] underline-offset-[7px]"
                    : "text-muted hover:text-ink")
                }
              >
                {l.label}
              </Link>
            );
          })}
          <span className="h-4 w-px shrink-0 bg-faint" aria-hidden />
          <LanguageToggle />
        </nav>
      </div>
    </header>
  );
}
