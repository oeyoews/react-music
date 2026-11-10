'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PlayIcon } from 'lucide-react';
import { useMusicStore, type QueueSong } from '~lib/store';
import { songIdFromPath } from '~lib/playlist-queue';
import { getImageUrl } from '~lib/format';
import type { NormalizedItem } from '~lib/homepage-block';

function queueSongFromItem(item: NormalizedItem): QueueSong | undefined {
  const songId = item.songId || songIdFromPath(item.href);
  if (!songId) return undefined;
  if (item.kind === 'playlist' || item.kind === 'album' || item.kind === 'mv') {
    return undefined;
  }
  return {
    id: songId,
    name: item.title,
    artist: item.subtitle,
    cover: getImageUrl(item.image, 120)
  };
}

export default function SongRow({
  item,
  index
}: {
  item: NormalizedItem;
  index?: number;
}) {
  const playSong = useMusicStore.use.playSong();
  const queueSong = queueSongFromItem(item);

  const onPlay = () => {
    if (!queueSong) return;
    playSong(queueSong);
  };

  const card = (
    <>
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        {item.image ? (
          <Image
            unoptimized
            src={getImageUrl(item.image, 320) || item.image}
            alt={item.title}
            width={220}
            height={220}
            className="size-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="size-full bg-muted" />
        )}
        {queueSong ? (
          <span className="absolute right-2 bottom-2 flex size-9 items-center justify-center rounded-full bg-[var(--brand)] text-white opacity-0 shadow transition-opacity group-hover:opacity-100">
            <PlayIcon className="size-4 fill-current" />
          </span>
        ) : null}
        {typeof index === 'number' && (
          <span className="absolute top-2 left-2 rounded bg-black/40 px-1.5 text-[11px] text-white">
            {index + 1}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{item.title}</p>
        {item.subtitle && (
          <p className="truncate text-xs text-muted-foreground">
            {item.subtitle}
          </p>
        )}
      </div>
    </>
  );

  if (queueSong) {
    return (
      <button
        type="button"
        onClick={onPlay}
        className="group flex min-w-[200px] max-w-[220px] shrink-0 flex-col gap-2 text-left"
      >
        {card}
      </button>
    );
  }

  if (!item.href) {
    return (
      <div className="group flex min-w-[200px] max-w-[220px] shrink-0 flex-col gap-2">
        {card}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className="group flex min-w-[200px] max-w-[220px] shrink-0 flex-col gap-2"
    >
      {card}
    </Link>
  );
}

export function SongListRow({ item }: { item: NormalizedItem }) {
  const playSong = useMusicStore.use.playSong();
  const queueSong = queueSongFromItem(item) ?? {
    id: Number(item.id),
    name: item.title,
    artist: item.subtitle,
    cover: getImageUrl(item.image, 120)
  };

  return (
    <li>
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left hover:bg-muted"
        onClick={() => {
          if (!Number.isFinite(queueSong.id)) return;
          playSong(queueSong);
        }}
      >
        <PlayIcon className="size-3.5 text-muted-foreground" />
        <span className="min-w-0 flex-1 truncate text-sm">{item.title}</span>
        <span className="text-xs text-muted-foreground">
          {item.subtitle || ''}
        </span>
      </button>
    </li>
  );
}
