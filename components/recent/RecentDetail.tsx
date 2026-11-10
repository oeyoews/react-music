'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  EllipsisIcon,
  FolderPlusIcon,
  HeartIcon,
  PlayIcon
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '~components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~components/ui/tabs';
import { formatCount, formatPlayedTime, getImageUrl } from '~lib/format';
import type {
  RecentResourceItem,
  RecentSongItem,
  RecentViewData
} from '~lib/recent-view';
import { useMusicStore, type QueueSong } from '~lib/store';
import { cn } from '~lib/utils';

const songRowGrid =
  'grid grid-cols-[2.25rem_minmax(0,1fr)_3.25rem] items-center gap-x-3 lg:grid-cols-[2.75rem_minmax(0,1.6fr)_minmax(0,0.7fr)_2.5rem_3.25rem]';

const resourceRowGrid =
  'grid grid-cols-[2.25rem_minmax(0,1fr)_3.25rem] items-center gap-x-3 sm:grid-cols-[2.25rem_minmax(0,1fr)_5.5rem]';

function artistLabel(artists: RecentSongItem['artists']) {
  return artists
    .map((artist) => artist.name)
    .filter(Boolean)
    .join(' / ');
}

export default function RecentDetail({ data }: { data: RecentViewData }) {
  const playSong = useMusicStore.use.playSong();
  const queue = useMusicStore.use.queue();
  const currentIndex = useMusicStore.use.currentIndex();
  const currentId = currentIndex >= 0 ? queue[currentIndex]?.id : undefined;

  const queueSongs = useMemo<QueueSong[]>(
    () =>
      data.songs.map((track) => ({
        id: track.id,
        name: track.name,
        artist: artistLabel(track.artists) || undefined,
        cover: track.cover ? getImageUrl(track.cover, 120) : undefined,
        duration: track.duration
      })),
    [data.songs]
  );

  const playAll = () => {
    if (queueSongs.length === 0) {
      toast.error('暂时没有可播放的歌曲');
      return;
    }
    playSong(queueSongs[0], queueSongs);
    toast.success('开始播放最近听过的歌曲');
  };

  const playFrom = (id: number) => {
    const index = queueSongs.findIndex((song) => song.id === id);
    const song = queueSongs[index];
    if (!song) return;
    playSong(song, queueSongs);
  };

  return (
    <div className="not-prose">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="m-0 text-2xl font-semibold tracking-tight">最近播放</h1>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={queueSongs.length === 0}
            onClick={playAll}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[var(--brand)] px-4 text-sm text-white hover:opacity-90 disabled:opacity-40"
          >
            <PlayIcon className="size-4 fill-current" />
            播放全部
          </button>
          <button
            type="button"
            onClick={() => toast('暂不支持收藏全部')}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border/80 px-3 text-sm hover:bg-muted/60"
          >
            <FolderPlusIcon className="size-4" />
            收藏全部
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  type="button"
                  aria-label="更多"
                  className="inline-flex size-9 items-center justify-center rounded-lg border border-border/80 hover:bg-muted/60"
                >
                  <EllipsisIcon className="size-4" />
                </button>
              }
            />
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href).then(
                    () => toast.success('已复制链接'),
                    () => toast.error('复制失败')
                  )
                }
              >
                复制链接
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Tabs defaultValue="songs" className="mt-8 gap-4">
        <TabsList
          variant="line"
          className="h-11 w-full justify-start gap-6 rounded-none border-b border-border/80 bg-transparent px-1"
        >
          <RecentTab value="songs" label="单曲" count={data.counts.song} />
          <RecentTab value="dj" label="播客" count={data.counts.dj} />
          <RecentTab value="voice" label="有声书" count={data.counts.voice} />
          <RecentTab
            value="playlists"
            label="歌单"
            count={data.counts.playlist}
          />
          <RecentTab value="albums" label="专辑" count={data.counts.album} />
        </TabsList>

        <TabsContent value="songs" className="outline-none">
          <SongTableHeader />
          {data.songs.length === 0 ? (
            <EmptyHint text="还没有单曲播放记录" />
          ) : (
            <ol>
              {data.songs.map((track, index) => (
                <SongRow
                  key={track.rowKey}
                  track={track}
                  index={index}
                  active={track.id === currentId}
                  onPlay={() => playFrom(track.id)}
                />
              ))}
            </ol>
          )}
        </TabsContent>

        <TabsContent value="dj" className="outline-none">
          <ResourceList items={data.dj} empty="还没有播客播放记录" />
        </TabsContent>

        <TabsContent value="voice" className="outline-none">
          <ResourceList items={data.voice} empty="还没有有声书播放记录" />
        </TabsContent>

        <TabsContent value="playlists" className="outline-none">
          <ResourceList items={data.playlists} empty="还没有歌单播放记录" />
        </TabsContent>

        <TabsContent value="albums" className="outline-none">
          <ResourceList items={data.albums} empty="还没有专辑播放记录" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function RecentTab({
  value,
  label,
  count
}: {
  value: string;
  label: string;
  count: number;
}) {
  return (
    <TabsTrigger
      value={value}
      className="h-11 flex-none rounded-none px-0 text-[15px] after:bottom-0 after:h-0.5 after:!bg-[var(--brand)] data-active:text-foreground"
    >
      {label}
      {count > 0 ? (
        <span className="ml-1 text-sm font-normal text-muted-foreground">
          {formatCount(count)}
        </span>
      ) : null}
    </TabsTrigger>
  );
}

function SongTableHeader() {
  return (
    <div
      className={cn(
        songRowGrid,
        'mb-1 hidden min-w-0 px-2 text-xs text-muted-foreground md:grid'
      )}
    >
      <span className="text-center">#</span>
      <span className="whitespace-nowrap">标题</span>
      <span className="hidden whitespace-nowrap lg:block">专辑</span>
      <span className="hidden text-center whitespace-nowrap lg:block">
        喜欢
      </span>
      <span className="text-right whitespace-nowrap">播放时间</span>
    </div>
  );
}

function EmptyHint({ text }: { text: string }) {
  return (
    <p className="px-2 py-10 text-center text-sm text-muted-foreground">
      {text}
    </p>
  );
}

function SongRow({
  track,
  index,
  active,
  onPlay
}: {
  track: RecentSongItem;
  index: number;
  active: boolean;
  onPlay: () => void;
}) {
  const cover = getImageUrl(track.cover, 80) || track.cover;
  const order = String(index + 1).padStart(2, '0');

  return (
    <li
      className={cn(
        songRowGrid,
        'group rounded-md px-2 py-1.5 transition-colors hover:bg-muted/80',
        active && 'bg-muted'
      )}
    >
      <button
        type="button"
        aria-label={`播放 ${track.name}`}
        onClick={onPlay}
        className="flex items-center justify-center text-xs text-muted-foreground tabular-nums"
      >
        <span className={cn(active ? 'hidden' : 'group-hover:hidden')}>
          {order}
        </span>
        <PlayIcon
          className={cn(
            'size-3.5 fill-current',
            active ? 'block text-[var(--brand)]' : 'hidden group-hover:block'
          )}
        />
      </button>

      <div className="flex min-w-0 items-center gap-2.5">
        <div className="relative size-10 shrink-0 overflow-hidden rounded-md bg-muted">
          {cover ? (
            <Image
              unoptimized
              src={cover}
              alt=""
              width={80}
              height={80}
              className="size-full object-cover"
            />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-1.5">
            <button
              type="button"
              title={track.name}
              onClick={onPlay}
              className={cn(
                'max-w-[70%] truncate text-left text-sm hover:text-[var(--brand)]',
                active && 'text-[var(--brand)]'
              )}
            >
              {track.name}
            </button>
            {track.sq ? (
              <Mark className="border-amber-500/80 text-amber-600">SQ</Mark>
            ) : null}
            {track.vip ? (
              <Mark className="border-[var(--brand)] text-[var(--brand)]">
                VIP
              </Mark>
            ) : null}
            <ArtistLinks
              artists={track.artists}
              className="hidden min-w-0 flex-1 md:block"
            />
          </div>
          <ArtistLinks
            artists={track.artists}
            className="mt-0.5 block md:hidden"
          />
        </div>
      </div>

      <div className="hidden min-w-0 lg:block">
        {track.albumId && track.albumName ? (
          <Link
            href={`/album/${track.albumId}`}
            title={track.albumName}
            className="block truncate text-sm text-muted-foreground hover:text-foreground"
          >
            {track.albumName}
          </Link>
        ) : (
          <span className="block truncate text-sm text-muted-foreground">
            {track.albumName || '—'}
          </span>
        )}
      </div>

      <div className="hidden justify-center lg:flex">
        <button
          type="button"
          aria-label={`喜欢 ${track.name}`}
          onClick={() => toast('暂不支持收藏单曲')}
          className="text-muted-foreground hover:text-[var(--brand)]"
        >
          <HeartIcon className="size-4" />
        </button>
      </div>

      <span className="text-right text-xs text-muted-foreground tabular-nums">
        {formatPlayedTime(track.playedAt)}
      </span>
    </li>
  );
}

function ResourceList({
  items,
  empty
}: {
  items: RecentResourceItem[];
  empty: string;
}) {
  if (items.length === 0) return <EmptyHint text={empty} />;

  return (
    <>
      <div
        className={cn(
          resourceRowGrid,
          'mb-1 hidden px-2 text-xs text-muted-foreground sm:grid'
        )}
      >
        <span className="text-center">#</span>
        <span>标题</span>
        <span className="text-right">播放时间</span>
      </div>
      <ol>
        {items.map((item, index) => (
          <ResourceRow key={item.rowKey} item={item} index={index} />
        ))}
      </ol>
    </>
  );
}

function ResourceRow({
  item,
  index
}: {
  item: RecentResourceItem;
  index: number;
}) {
  const cover = getImageUrl(item.cover, 80) || item.cover;
  const order = String(index + 1).padStart(2, '0');
  const title = item.href ? (
    <Link
      href={item.href}
      className="truncate text-sm hover:text-[var(--brand)]"
    >
      {item.name}
    </Link>
  ) : (
    <span className="truncate text-sm">{item.name}</span>
  );

  return (
    <li
      className={cn(
        resourceRowGrid,
        'rounded-md px-2 py-2 transition-colors hover:bg-muted/80'
      )}
    >
      <span className="text-center text-xs text-muted-foreground tabular-nums">
        {order}
      </span>
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="relative size-10 shrink-0 overflow-hidden rounded-md bg-muted">
          {cover ? (
            <Image
              unoptimized
              src={cover}
              alt=""
              width={80}
              height={80}
              className="size-full object-cover"
            />
          ) : null}
        </div>
        <div className="min-w-0">
          {title}
          {item.subtitle ? (
            <p className="truncate text-xs text-muted-foreground">
              {item.subtitle}
            </p>
          ) : null}
        </div>
      </div>
      <span className="text-right text-xs text-muted-foreground tabular-nums">
        {formatPlayedTime(item.playedAt)}
      </span>
    </li>
  );
}

function ArtistLinks({
  artists,
  className
}: {
  artists: RecentSongItem['artists'];
  className?: string;
}) {
  if (artists.length === 0) return null;
  return (
    <span className={cn('truncate text-xs text-muted-foreground', className)}>
      {artists.map((artist, index) => (
        <span key={`${artist.id}-${artist.name}`}>
          {index > 0 ? ' / ' : null}
          {artist.id ? (
            <Link
              href={`/artist/${artist.id}`}
              className="hover:text-foreground"
              onClick={(event) => event.stopPropagation()}
            >
              {artist.name}
            </Link>
          ) : (
            artist.name
          )}
        </span>
      ))}
    </span>
  );
}

function Mark({
  children,
  className
}: {
  children: string;
  className: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex h-3.5 shrink-0 items-center rounded-[2px] border px-0.5 text-[9px] leading-none font-medium',
        className
      )}
    >
      {children}
    </span>
  );
}
