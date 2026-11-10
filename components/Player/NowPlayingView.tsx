'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import { useMusicStore } from '~lib/store';
import { toQueueSong } from '~lib/playlist-queue';
import { useSongDetailData, useSiMiSong } from '~lib/hooks';
import { LyricScroll } from '~components/Player/LyricScroll';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '~lib/utils';

function VinylDisc({
  cover,
  alt,
  spinning
}: {
  cover?: string;
  alt: string;
  spinning: boolean;
}) {
  return (
    <div className="relative size-56 md:size-80">
      <div
        className={cn(
          'relative size-full rounded-full bg-zinc-800 p-3 shadow-2xl ring-1 ring-black/10 md:p-4 dark:bg-neutral-800/90 dark:ring-white/10',
          spinning && 'rotate animated'
        )}
      >
        <div className="relative size-full overflow-hidden rounded-full bg-zinc-900 dark:bg-neutral-900">
          {cover ? (
            <Image
              unoptimized
              src={cover}
              alt={alt}
              width={320}
              height={320}
              className="size-full object-cover"
            />
          ) : (
            <div className="size-full bg-zinc-700 dark:bg-neutral-700" />
          )}
          <div className="absolute inset-0 m-auto size-14 rounded-full bg-zinc-900 ring-4 ring-zinc-800 md:size-16 dark:bg-neutral-900 dark:ring-neutral-800" />
        </div>
      </div>
      <Tonearm />
    </div>
  );
}

/** 轴座在唱片外的右上角，唱针落在沟槽上，不随唱片转动。 */
function Tonearm() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="pointer-events-none absolute inset-0 size-full overflow-visible text-zinc-700 dark:text-zinc-100"
      aria-hidden
    >
      <g fill="currentColor" stroke="currentColor">
        <circle cx="98.2" cy="2.4" r="2.2" />
        <circle cx="95.2" cy="5.2" r="3.6" />
        <circle
          cx="95.2"
          cy="5.2"
          r="1.35"
          className="fill-zinc-400 stroke-none dark:fill-zinc-500"
        />
        <line
          x1="91.6"
          y1="7.8"
          x2="80.6"
          y2="16.2"
          fill="none"
          strokeWidth="1.45"
          strokeLinecap="round"
        />
        <g transform="translate(80.6 16.2) rotate(142.8)">
          <rect x="0" y="-1.8" width="7.2" height="3.6" rx="0.55" />
          <circle
            cx="6.6"
            cy="0"
            r="0.5"
            className="fill-zinc-950 stroke-none dark:fill-black"
          />
        </g>
      </g>
    </svg>
  );
}

function SimilarSongs({ songId }: { songId: string }) {
  const { data, isLoading } = useSiMiSong(songId);
  const playSong = useMusicStore.use.playSong();

  if (isLoading) {
    return <p className="py-8 text-muted-foreground">加载中...</p>;
  }

  const songs = data?.songs ?? [];
  if (songs.length === 0) {
    return <p className="py-8 text-muted-foreground">暂无相似歌曲</p>;
  }

  const queue = songs.slice(0, 20).map((song) => toQueueSong(song));

  return (
    <ul className="flex-1 space-y-2 overflow-y-auto py-4">
      {queue.map((song) => (
        <li key={song.id}>
          <button
            type="button"
            className="block w-full truncate rounded-md px-2 py-1.5 text-left text-foreground/90 hover:bg-muted hover:text-foreground"
            onClick={() => playSong(song, queue)}
          >
            {song.name}
            {song.artist ? (
              <span className="ml-2 text-sm text-muted-foreground">
                {song.artist}
              </span>
            ) : null}
          </button>
        </li>
      ))}
    </ul>
  );
}

const shellEase = [0.32, 0.72, 0, 1] as const;

export function NowPlayingView() {
  const open = useMusicStore.use.nowPlayingOpen();
  const setNowPlayingOpen = useMusicStore.use.setNowPlayingOpen();
  const queue = useMusicStore.use.queue();
  const currentIndex = useMusicStore.use.currentIndex();
  const progress = useMusicStore.use.progress();
  const isPlaying = useMusicStore.use.isPlaying();

  const current = currentIndex >= 0 ? queue[currentIndex] : undefined;
  const songId = current?.id ? String(current.id) : '';
  const { data: detail } = useSongDetailData(songId);
  const song = detail?.songs?.[0];
  const albumName = song?.al?.name;
  const albumId = song?.al?.id;
  const artists =
    song?.ar?.map((a) => a.name).join(' / ') || current?.artist || '未知歌手';

  if (!current) return null;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="now-playing"
          className="fixed inset-x-0 top-0 z-[45] flex flex-col border-t border-border bg-background text-foreground shadow-[0_-12px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_-12px_40px_rgba(0,0,0,0.45)]"
          style={{ bottom: 'var(--player-bar-height)' }}
          role="dialog"
          aria-modal="true"
          aria-label="正在播放"
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ duration: 0.38, ease: shellEase }}
        >
          <motion.div
            className="absolute top-3 left-3 z-10"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, delay: 0.08, ease: shellEase }}
          >
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label="收起"
              onClick={() => setNowPlayingOpen(false)}
            >
              <ChevronDownIcon className="size-5" />
            </Button>
          </motion.div>

          <div className="mx-auto flex h-full min-h-0 w-full max-w-5xl flex-1 flex-col gap-8 overflow-hidden px-6 pt-14 pb-6 md:flex-row md:items-center md:gap-12">
            <motion.div
              className="flex shrink-0 justify-center self-center md:w-[42%]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.42, delay: 0.06, ease: shellEase }}
            >
              <VinylDisc
                cover={current.cover || song?.al?.picUrl}
                alt={current.name}
                spinning={isPlaying}
              />
            </motion.div>

            <motion.div
              className="flex h-full min-h-0 min-w-0 flex-1 flex-col self-stretch overflow-hidden"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.36, delay: 0.1, ease: shellEase }}
            >
              <h1 className="truncate text-2xl font-semibold md:text-3xl">
                {current.name}
              </h1>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                {albumName && albumId ? (
                  <span>
                    专辑：
                    <Link
                      href={`/album/${albumId}`}
                      className="text-foreground/85 hover:text-[var(--brand)] hover:underline"
                    >
                      {albumName}
                    </Link>
                  </span>
                ) : null}
                <span>
                  歌手：
                  {song?.ar?.[0]?.id ? (
                    <Link
                      href={`/artist/${song.ar[0].id}`}
                      className="text-foreground/85 hover:text-[var(--brand)] hover:underline"
                    >
                      {artists}
                    </Link>
                  ) : (
                    artists
                  )}
                </span>
              </div>

              <Tabs
                defaultValue="lyric"
                className="mt-6 flex min-h-0 flex-1 flex-col"
              >
                <TabsList className="w-fit">
                  <TabsTrigger value="lyric">歌词</TabsTrigger>
                  <TabsTrigger value="similar">相似推荐</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="lyric"
                  className="min-h-0 flex-1 overflow-hidden"
                >
                  <LyricScroll
                    songId={songId}
                    progress={progress}
                    variant="fullscreen"
                  />
                </TabsContent>
                <TabsContent
                  value="similar"
                  className="min-h-0 flex-1 overflow-hidden"
                >
                  <SimilarSongs songId={songId} />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
