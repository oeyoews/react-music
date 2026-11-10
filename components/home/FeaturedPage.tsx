'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, PlayIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import EmptyHint from '~components/home/EmptyHint';
import { getPlayListSongs } from '~lib/api/playlist';
import type { FeaturedPlaylist, FeaturedSong } from '~lib/api/featured';
import { formatCount, getImageUrl } from '~lib/format';
import { tracksToQueue } from '~lib/playlist-queue';
import { useMusicStore, type QueueSong } from '~lib/store';
import { cn } from '~lib/utils';

const discoverTabs = ['精选', '歌单广场', '排行榜', '歌手', 'VIP'];

function coverSrc(url: string | undefined, size: number) {
  if (!url) return undefined;
  const clean = url.split('?')[0];
  return getImageUrl(clean, size) || clean;
}

export default function FeaturedPage({
  playlists,
  songs
}: {
  playlists: FeaturedPlaylist[];
  songs: FeaturedSong[];
}) {
  return (
    <div className="not-prose space-y-7">
      <nav
        aria-label="发现"
        className="flex items-center gap-8 overflow-x-auto"
      >
        {discoverTabs.map((tab) => {
          const current = tab === '精选';
          return (
            <span
              key={tab}
              aria-current={current ? 'page' : undefined}
              className={cn(
                'relative shrink-0 pb-1.5 text-[15px] whitespace-nowrap text-foreground',
                current &&
                  'font-medium text-[var(--brand)] after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-4 after:-translate-x-1/2 after:rounded-full after:bg-[var(--brand)]'
              )}
            >
              {tab}
            </span>
          );
        })}
      </nav>

      <section className="space-y-3">
        <SectionTitle>官方歌单</SectionTitle>
        {playlists.length === 0 ? (
          <EmptyHint text="官方歌单加载失败" />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
            {playlists.map((playlist) => (
              <OfficialCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-2">
        <SectionTitle>最新音乐</SectionTitle>
        {songs.length === 0 ? (
          <EmptyHint text="最新音乐加载失败" />
        ) : (
          <NewSongGrid songs={songs} />
        )}
      </section>
    </div>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="m-0 flex items-center gap-0.5 text-[17px] font-semibold tracking-tight">
      {children}
      <ChevronRight className="size-4 text-foreground/70" />
    </h2>
  );
}

function OfficialCard({ playlist }: { playlist: FeaturedPlaylist }) {
  const playSong = useMusicStore.use.playSong();
  const [pending, setPending] = useState(false);
  const image = coverSrc(playlist.image, 480);
  const playlistId = Number(playlist.id);

  const onPlay = async () => {
    if (!Number.isFinite(playlistId) || pending) return;
    setPending(true);
    try {
      const data = await getPlayListSongs(playlistId, 30);
      const queue = tracksToQueue(data?.songs ?? [], playlist.image);
      if (!queue.length) {
        toast.error('这个歌单暂时没有可播放的歌曲');
        return;
      }
      playSong(queue[0], queue);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-[10px] bg-muted">
      <Link href={playlist.href} className="block">
        <div className="relative aspect-[3/4]">
          {image ? (
            <Image
              unoptimized
              src={image}
              alt={playlist.title}
              width={360}
              height={480}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="size-full bg-muted" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.5)_26%,rgba(0,0,0,0.08)_52%,transparent_68%)]" />
          {typeof playlist.playCount === 'number' ? (
            <span className="absolute top-2 right-2 inline-flex items-center gap-0.5 text-[11px] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]">
              <PlayIcon className="size-2.5 fill-current" />
              {formatCount(playlist.playCount)}
            </span>
          ) : null}
          <div className="absolute inset-x-0 bottom-0 px-2.5 pb-2.5">
            <p className="line-clamp-2 text-base leading-snug font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]">
              {playlist.title}
            </p>
            {playlist.description ? (
              <p className="mt-1 line-clamp-2 text-xs leading-snug text-white/90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.55)]">
                {playlist.description}
              </p>
            ) : null}
          </div>
        </div>
      </Link>
      <button
        type="button"
        aria-label={`播放${playlist.title}`}
        disabled={pending}
        onClick={onPlay}
        className="pointer-events-none absolute top-1/2 left-1/2 z-10 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--brand)] text-white opacity-0 shadow-lg transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 focus-visible:pointer-events-auto focus-visible:opacity-100 disabled:opacity-80"
      >
        <PlayIcon className="size-4 fill-current" />
      </button>
    </div>
  );
}

function NewSongGrid({ songs }: { songs: FeaturedSong[] }) {
  const playSong = useMusicStore.use.playSong();
  const queue = useMusicStore.use.queue();
  const currentIndex = useMusicStore.use.currentIndex();
  const currentId = currentIndex >= 0 ? queue[currentIndex]?.id : undefined;

  const nextQueue: QueueSong[] = songs.map((song) => ({
    id: song.id,
    name: song.name,
    artist: song.artist,
    cover: song.cover,
    duration: song.duration
  }));

  return (
    <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
      {songs.map((song, index) => {
        const cover = coverSrc(song.cover, 120);
        const active = song.id === currentId;
        return (
          <li key={song.id}>
            <button
              type="button"
              onClick={() => {
                const target = nextQueue[index];
                if (!target) return;
                playSong(target, nextQueue);
              }}
              className="flex w-full items-center gap-3 rounded-md px-1.5 py-1.5 text-left hover:bg-muted/70"
            >
              <span className="relative size-11 shrink-0 overflow-hidden rounded-[6px] bg-muted">
                {cover ? (
                  <Image
                    unoptimized
                    src={cover}
                    alt=""
                    width={88}
                    height={88}
                    className="size-full object-cover"
                  />
                ) : null}
              </span>
              <span className="min-w-0">
                <span
                  className={cn(
                    'block truncate text-[13px]',
                    active && 'text-[var(--brand)]'
                  )}
                >
                  {song.name}
                </span>
                <span className="mt-0.5 flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
                  {song.sq ? <SqMark /> : null}
                  <span className="truncate">{song.artist}</span>
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function SqMark() {
  return (
    <span className="inline-flex h-3.5 shrink-0 items-center rounded-[2px] border border-[#e0a23a] px-0.5 text-[9px] leading-none font-medium text-[#e0a23a]">
      SQ
    </span>
  );
}
