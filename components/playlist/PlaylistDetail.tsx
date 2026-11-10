'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  EllipsisIcon,
  FolderPlusIcon,
  HeartIcon,
  PlayIcon,
  SearchIcon
} from 'lucide-react';
import toast from 'react-hot-toast';
import SongCommentTab from '~components/SongCommentTab';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '~components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~components/ui/tabs';
import { formatCount, formatDuration, getImageUrl } from '~lib/format';
import type {
  PlaylistDetailData,
  PlaylistPerson,
  PlaylistTrackItem
} from '~lib/playlist-view';
import { useMusicStore, type QueueSong } from '~lib/store';
import { cn } from '~lib/utils';

export type { PlaylistDetailData, PlaylistPerson, PlaylistTrackItem };

const rowGrid =
  'grid grid-cols-[2.25rem_minmax(0,1fr)_3.25rem] items-center gap-x-3 lg:grid-cols-[2.75rem_minmax(0,1.6fr)_minmax(0,0.7fr)_2.5rem_3.25rem]';

function formatCreated(timestamp?: number) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return '';
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}创建`;
}

function formatTrackDuration(ms?: number) {
  const text = formatDuration(ms);
  if (text === '--:--') return text;
  const [minutes, seconds] = text.split(':');
  return `${minutes.padStart(2, '0')}:${seconds}`;
}

function artistLabel(artists: PlaylistTrackItem['artists']) {
  return artists
    .map((artist) => artist.name)
    .filter(Boolean)
    .join(' / ');
}

export default function PlaylistDetail({ data }: { data: PlaylistDetailData }) {
  const playSong = useMusicStore.use.playSong();
  const queue = useMusicStore.use.queue();
  const currentIndex = useMusicStore.use.currentIndex();
  const [keyword, setKeyword] = useState('');

  const queueSongs = useMemo<QueueSong[]>(
    () =>
      data.tracks.map((track) => ({
        id: track.id,
        name: track.name,
        artist: artistLabel(track.artists) || undefined,
        cover: track.cover || data.cover,
        duration: track.duration
      })),
    [data.cover, data.tracks]
  );

  const currentId = currentIndex >= 0 ? queue[currentIndex]?.id : undefined;
  const query = keyword.trim().toLowerCase();
  const visibleTracks = query
    ? data.tracks.filter((track) => {
        const haystack = [
          track.name,
          track.albumName,
          artistLabel(track.artists)
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return haystack.includes(query);
      })
    : data.tracks;

  const playAll = () => {
    if (queueSongs.length === 0) {
      toast.error('歌单没有可播放的歌曲');
      return;
    }
    playSong(queueSongs[0], queueSongs);
    toast.success(`开始播放「${data.name}」`);
  };

  const playFrom = (id: number) => {
    const index = queueSongs.findIndex((song) => song.id === id);
    const song = queueSongs[index];
    if (!song) return;
    playSong(song, queueSongs);
  };

  return (
    <div className="not-prose">
      <PlaylistHeader
        data={data}
        canPlay={queueSongs.length > 0}
        onPlayAll={playAll}
      />
      <Tabs defaultValue="songs" className="mt-6 gap-4">
        <TabsList
          variant="line"
          className="h-11 w-full justify-start gap-6 rounded-none border-b border-border/80 bg-transparent px-1"
        >
          <PlaylistTab value="songs" label="歌曲" count={data.trackCount} />
          <PlaylistTab
            value="comments"
            label="评论"
            count={data.commentCount}
          />
          <PlaylistTab
            value="subscribers"
            label="收藏者"
            count={data.subscribedCount}
          />
        </TabsList>

        <TabsContent value="songs" className="outline-none">
          <div className="mb-1 flex items-center gap-4">
            <div
              className={cn(
                rowGrid,
                'hidden min-w-0 flex-1 px-2 text-xs text-muted-foreground md:grid'
              )}
            >
              <span className="text-center">#</span>
              <span className="whitespace-nowrap">标题</span>
              <span className="hidden whitespace-nowrap lg:block">专辑</span>
              <span className="hidden text-center whitespace-nowrap lg:block">
                喜欢
              </span>
              <span className="text-right whitespace-nowrap">时长</span>
            </div>
            <label className="relative ml-auto block">
              <span className="sr-only">搜索歌单内歌曲</span>
              <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="搜索"
                className="h-8 w-36 rounded-full bg-muted/80 pr-3 pl-8 text-xs outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring sm:w-44"
              />
            </label>
          </div>

          {visibleTracks.length === 0 ? (
            <p className="px-2 py-10 text-center text-sm text-muted-foreground">
              {data.tracks.length === 0
                ? '这首歌单暂时没有歌曲'
                : '没有找到相关歌曲'}
            </p>
          ) : (
            <ol>
              {visibleTracks.map((track) => (
                <TrackRow
                  key={track.id}
                  track={track}
                  index={data.tracks.findIndex((item) => item.id === track.id)}
                  active={track.id === currentId}
                  onPlay={() => playFrom(track.id)}
                />
              ))}
            </ol>
          )}

          {data.trackCount > data.tracks.length ? (
            <p className="px-2 pt-3 text-xs text-muted-foreground">
              已加载 {data.tracks.length} / {data.trackCount} 首
            </p>
          ) : null}
        </TabsContent>

        <TabsContent value="comments" className="outline-none">
          {data.comments && data.commentCount > 0 ? (
            <SongCommentTab songComment={data.comments} />
          ) : (
            <p className="py-10 text-center text-sm text-muted-foreground">
              {data.comments ? '还没有评论' : '评论加载失败，请稍后重试'}
            </p>
          )}
        </TabsContent>

        <TabsContent value="subscribers" className="outline-none">
          {data.subscribers.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              {data.subscribedCount > 0
                ? '收藏者列表暂时没有加载出来'
                : '还没有人收藏'}
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
              {data.subscribers.map((person) => (
                <li key={person.userId}>
                  <div className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted/70">
                    <PersonAvatar person={person} size={40} />
                    <div className="min-w-0">
                      <p className="truncate text-sm">{person.nickname}</p>
                      {person.signature ? (
                        <p className="truncate text-xs text-muted-foreground">
                          {person.signature}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PlaylistTab({
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
      <span className="ml-1 text-sm font-normal text-muted-foreground">
        {formatCount(count)}
      </span>
    </TabsTrigger>
  );
}

function PlaylistHeader({
  data,
  canPlay,
  onPlayAll
}: {
  data: PlaylistDetailData;
  canPlay: boolean;
  onPlayAll: () => void;
}) {
  const created = formatCreated(data.createTime);
  const cover = getImageUrl(data.cover, 480) || data.cover;

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => toast.success('已复制歌单链接'),
      () => toast.error('复制失败')
    );
  };

  return (
    <section className="relative -mx-4 -mt-6 overflow-hidden px-4 pt-6 pb-8 md:-mx-6 md:px-6">
      {cover ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 scale-110 bg-cover bg-center opacity-70 blur-3xl dark:opacity-40"
          style={{ backgroundImage: `url("${cover}")` }}
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/20 via-background/55 to-background" />
      <div className="relative flex animate-in flex-col gap-5 fade-in-0 slide-in-from-bottom-2 duration-500 sm:flex-row sm:items-stretch">
        <div className="relative size-40 shrink-0 overflow-hidden rounded-lg bg-muted shadow-md ring-1 ring-black/10 sm:size-52">
          {cover ? (
            <Image
              unoptimized
              src={cover}
              alt={data.name}
              width={480}
              height={480}
              priority
              className="size-full object-cover"
            />
          ) : null}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/50 to-transparent" />
          {typeof data.playCount === 'number' ? (
            <span className="absolute top-1.5 right-2 inline-flex items-center gap-0.5 text-xs font-medium text-white drop-shadow">
              <PlayIcon className="size-3 fill-current" />
              {formatCount(data.playCount)}
            </span>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3 py-1">
          <h1 className="m-0 text-xl leading-snug font-semibold tracking-tight sm:text-2xl">
            {data.name}
          </h1>
          {data.description ? (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {data.description}
            </p>
          ) : null}
          {data.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {data.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/search?searchWord=${encodeURIComponent(tag)}`}
                  className="rounded-full bg-background/70 px-2 py-0.5 text-xs text-muted-foreground ring-1 ring-foreground/10 hover:text-foreground"
                >
                  {tag}
                </Link>
              ))}
            </div>
          ) : null}
          {data.creator ? (
            <div className="flex min-w-0 items-center gap-2 text-sm">
              <PersonAvatar person={data.creator} size={24} />
              <span className="truncate text-[var(--brand)]">
                {data.creator.nickname}
              </span>
              {created ? (
                <span className="shrink-0 text-muted-foreground">
                  {created}
                </span>
              ) : null}
            </div>
          ) : null}

          <div className="mt-auto flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={onPlayAll}
              disabled={!canPlay}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[var(--brand)] px-4 text-sm text-white transition-colors hover:bg-[var(--brand)]/90 disabled:opacity-50"
            >
              <PlayIcon className="size-4 fill-current" />
              播放全部
            </button>
            <button
              type="button"
              onClick={() => toast('暂不支持收藏歌单')}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border/80 bg-background/75 px-3 text-sm hover:bg-background"
            >
              <FolderPlusIcon className="size-4" />
              {formatCount(data.subscribedCount)}
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    aria-label="更多"
                    className="inline-flex size-9 items-center justify-center rounded-lg border border-border/80 bg-background/75 hover:bg-background"
                  >
                    <EllipsisIcon className="size-4" />
                  </button>
                }
              />
              <DropdownMenuContent align="start" className="w-36">
                <DropdownMenuItem onClick={copyLink}>复制链接</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrackRow({
  track,
  index,
  active,
  onPlay
}: {
  track: PlaylistTrackItem;
  index: number;
  active: boolean;
  onPlay: () => void;
}) {
  const cover = getImageUrl(track.cover, 80) || track.cover;
  const order = String(index + 1).padStart(2, '0');

  return (
    <li
      className={cn(
        rowGrid,
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
        {formatTrackDuration(track.duration)}
      </span>
    </li>
  );
}

function ArtistLinks({
  artists,
  className
}: {
  artists: PlaylistTrackItem['artists'];
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

function PersonAvatar({
  person,
  size
}: {
  person: PlaylistPerson;
  size: number;
}) {
  const src = getImageUrl(person.avatarUrl, size * 2) || person.avatarUrl;
  if (!src) {
    return (
      <span
        className="inline-flex shrink-0 items-center justify-center rounded-full bg-muted text-[10px] text-muted-foreground"
        style={{ width: size, height: size }}
      >
        {person.nickname.slice(0, 1)}
      </span>
    );
  }
  return (
    <Image
      unoptimized
      src={src}
      alt=""
      width={size}
      height={size}
      className="shrink-0 rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
}
