import Link from 'next/link';
import Image from 'next/image';
import type { Route } from 'next';
import { HeadphonesIcon } from 'lucide-react';
import { formatCount, getImageUrl } from '~lib/format';
import type { NormalizedItem } from '~lib/homepage-block';

export default function HomePlaylistCard({ item }: { item: NormalizedItem }) {
  const href = (item.href || `/playlist/${item.id}`) as Route;
  const cover = getImageUrl(item.image, 320) || item.image;

  const inner = (
    <div className="group relative w-[168px] shrink-0">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/5">
        {cover ? (
          <Image
            unoptimized
            src={cover}
            alt={item.title}
            width={168}
            height={168}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="size-full bg-muted" />
        )}
        {typeof item.playCount === 'number' && (
          <span className="absolute top-1.5 right-1.5 inline-flex items-center gap-1 rounded-full bg-black/45 px-1.5 py-0.5 text-[11px] text-white">
            <HeadphonesIcon className="size-3" />
            {formatCount(item.playCount)}
          </span>
        )}
      </div>
      <p className="mt-2 line-clamp-2 text-sm leading-snug">{item.title}</p>
      {item.subtitle ? (
        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
          {item.subtitle}
        </p>
      ) : null}
    </div>
  );

  if (item.external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="block shrink-0"
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className="block shrink-0">
      {inner}
    </Link>
  );
}
