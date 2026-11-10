import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function BlockSectionLink({
  href,
  label = '更多'
}: {
  href: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground"
    >
      {label}
      <ChevronRight className="size-3.5" />
    </Link>
  );
}
