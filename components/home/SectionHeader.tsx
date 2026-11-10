import Link from 'next/link';
import type { Route } from 'next';
import { ChevronRight } from 'lucide-react';

export default function SectionHeader({
  title,
  hint,
  href,
  linkText = '查看全部'
}: {
  title: string;
  hint?: React.ReactNode;
  href?: Route;
  linkText?: string;
}) {
  return (
    <div className="not-prose mb-4 flex items-end justify-between gap-4">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="m-0 text-xl leading-tight font-semibold tracking-tight">
          {title}
        </h2>
        {hint ? (
          <span className="text-xs text-muted-foreground">{hint}</span>
        ) : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-0.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {linkText}
          <ChevronRight className="size-3.5" />
        </Link>
      ) : null}
    </div>
  );
}
