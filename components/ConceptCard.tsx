"use client";

import Link from "next/link";

interface ConceptCardProps {
  index: string;
  title: string;
  description: string;
  badge: string;
  href?: string;
}

export default function ConceptCard({
  index,
  title,
  description,
  badge,
  href,
}: ConceptCardProps) {
  const inner = (
    <article
      className={
        "group flex h-full flex-col gap-3 border-t pt-5 transition-colors " +
        (href ? "border-ink/25 hover:border-ink" : "border-faint opacity-55")
      }
    >
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-xs tabular-nums text-muted">{index}</span>
        <span
          className={
            "text-[11px] uppercase tracking-[0.16em] " +
            (href ? "text-accent" : "text-muted")
          }
        >
          {badge}
        </span>
      </div>
      <h3
        className={
          "font-display text-xl leading-snug text-ink " +
          (href ? "transition-colors group-hover:text-accent" : "")
        }
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
      {href && (
        <span
          aria-hidden
          className="mt-auto pt-2 text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
        >
          →
        </span>
      )}
    </article>
  );

  if (!href) return inner;
  return (
    <Link href={href} className="block h-full">
      {inner}
    </Link>
  );
}
