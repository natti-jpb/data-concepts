"use client";

import Link from "next/link";

interface ConceptCardProps {
  title: string;
  description: string;
  badge: string;
  href?: string;
}

export default function ConceptCard({
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
      <div className="flex items-center justify-between">
        <span
          className={
            "text-[11px] uppercase tracking-[0.16em] " +
            (href ? "text-accent" : "text-muted")
          }
        >
          {badge}
        </span>
        {href && (
          <span className="text-muted transition-transform group-hover:translate-x-0.5">
            →
          </span>
        )}
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
    </article>
  );

  if (!href) return inner;
  return (
    <Link href={href} className="block h-full">
      {inner}
    </Link>
  );
}
