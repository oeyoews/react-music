'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { PlayIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useMusicStore, type QueueSong } from '~lib/store';
import { toQueueSong } from '~lib/playlist-queue';
import { getSimiSong } from '~lib/search';
import formatTime from '~lib/formatTime';
import { Switch } from '@/components/ui/switch';
import { cn } from '~lib/utils';

function formatQueueDuration(duration?: number) {
  if (!duration || !Number.isFinite(duration) || duration <= 0) return '';
  const seconds = duration >= 10000 ? duration / 1000 : duration;
  return formatTime(seconds);
}

export function PlayQueuePanel({ onClose }: { onClose: () => void }) {
  const queue = useMusicStore.use.queue();
  const currentIndex = useMusicStore.use.currentIndex();
  const playAt = useMusicStore.use.playAt();
  const playSong = useMusicStore.use.playSong();
  const clearQueue = useMusicStore.use.clearQueue();
  const [recommend, setRecommend] = useState(true);
  const [anchorId, setAnchorId] = useState('');
  const [similar, setSimilar] = useState<Song[]>([]);
  const activeRef = useRef<HTMLLIElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const queueRef = useRef(queue);
  const holdScroll = useRef(false);
  const scrollTopRef = useRef(0);
  const pinnedIds = useRef(new Set<number>());

  queueRef.current = queue;

  const current = currentIndex >= 0 ? queue[currentIndex] : undefined;
  const songId = current?.id ? String(current.id) : '';

  useEffect(() => {
    if (recommend && !anchorId && songId) setAnchorId(songId);
  }, [recommend, anchorId, songId]);

  const { data: simi } = useSWR(
    recommend && anchorId ? ['queue-simi', anchorId] : null,
    () => getSimiSong(anchorId)
  );

  useEffect(() => {
    if (!recommend) {
      setSimilar([]);
      return;
    }
    const queued = new Set(queueRef.current.map((song) => song.id));
    setSimilar(
      (simi?.songs ?? [])
        .filter((song) => song?.id && !queued.has(song.id))
        .slice(0, 8)
    );
  }, [recommend, simi]);

  const keepPosition = () => {
    holdScroll.current = true;
    scrollTopRef.current = listRef.current?.scrollTop ?? 0;
  };

  useLayoutEffect(() => {
    if (!holdScroll.current || !listRef.current) return;
    listRef.current.scrollTop = scrollTopRef.current;
  });

  useEffect(() => {
    if (holdScroll.current) {
      holdScroll.current = false;
      if (listRef.current) listRef.current.scrollTop = scrollTopRef.current;
      return;
    }
    activeRef.current?.scrollIntoView({ block: 'nearest' });
  }, [currentIndex]);

  const playRecommended = (song: Song) => {
    const queued = toQueueSong(song);
    const index = queue.findIndex((item) => item.id === queued.id);
    keepPosition();
    if (index >= 0) {
      playAt(index);
      return;
    }
    pinnedIds.current.add(queued.id);
    playSong(queued, [...queue, queued]);
  };

  const clear = () => {
    clearQueue();
    onClose();
    toast.success('已清空播放列表');
  };

  const onRecommendChange = (next: boolean) => {
    setRecommend(next);
    setAnchorId(next ? songId : '');
    if (!next) pinnedIds.current.clear();
  };

  return (
    <aside
      className="fixed right-3 z-40 flex w-[22.5rem] max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
      style={{
        bottom: 'calc(var(--player-bar-height) + 0.75rem)',
        maxHeight: 'min(36rem, calc(100vh - var(--player-bar-height) - 5rem))'
      }}
      aria-label="播放列表"
    >
      <div className="flex items-center justify-between gap-3 px-4 pt-3.5 pb-2">
        <h2 className="m-0 text-[15px] font-semibold">
          播放列表
          <span className="ml-1.5 text-sm font-normal text-muted-foreground">
            {queue.length}
          </span>
        </h2>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <button
            type="button"
            className="hover:text-foreground"
            onClick={() => toast('暂不支持批量收藏')}
          >
            收藏全部
          </button>
          <button
            type="button"
            className="hover:text-foreground"
            onClick={clear}
            disabled={queue.length === 0}
          >
            清空
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <p className="text-xs text-muted-foreground">
          在列表下方推荐你喜欢的相似歌曲
        </p>
        <Switch
          checked={recommend}
          onCheckedChange={onRecommendChange}
          aria-label="推荐相似歌曲"
          className="data-checked:bg-[var(--brand)] data-unchecked:bg-muted-foreground/25"
        />
      </div>

      <ul ref={listRef} className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
        {queue.length === 0 ? (
          <li className="px-2 py-8 text-center text-sm text-muted-foreground">
            播放列表是空的
          </li>
        ) : (
          queue.map((song, index) =>
            pinnedIds.current.has(song.id) ? null : (
              <QueueRow
                key={`${song.id}-${index}`}
                song={song}
                active={index === currentIndex}
                rowRef={index === currentIndex ? activeRef : undefined}
                onClick={() => {
                  keepPosition();
                  playAt(index);
                }}
              />
            )
          )
        )}
        {similar.map((song) => {
          const pinned = pinnedIds.current.has(song.id);
          const playing = pinned && current?.id === song.id;
          return (
            <QueueRow
              key={`simi-${song.id}`}
              song={toQueueSong(song)}
              durationMs={song.duration}
              recommended
              active={playing}
              rowRef={playing ? activeRef : undefined}
              onClick={() => playRecommended(song)}
            />
          );
        })}
      </ul>
    </aside>
  );
}

function QueueRow({
  song,
  active,
  recommended,
  durationMs,
  rowRef,
  onClick
}: {
  song: QueueSong;
  active?: boolean;
  recommended?: boolean;
  durationMs?: number;
  rowRef?: React.Ref<HTMLLIElement>;
  onClick: () => void;
}) {
  const time = formatQueueDuration(durationMs ?? song.duration);

  return (
    <li ref={rowRef}>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-muted/70',
          active && 'bg-muted'
        )}
      >
        <span className="relative size-10 shrink-0 overflow-hidden rounded-md bg-muted">
          {song.cover ? (
            <Image
              unoptimized
              src={song.cover}
              alt=""
              width={80}
              height={80}
              className="size-full object-cover"
            />
          ) : null}
          {active ? (
            <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
              <PlayIcon className="size-3.5 fill-current" />
            </span>
          ) : null}
        </span>
        <span className="min-w-0 flex-1">
          <span
            className={cn(
              'block truncate text-sm',
              active && 'text-[var(--brand)]'
            )}
          >
            {song.name}
          </span>
          <span className="mt-0.5 flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
            <span className="truncate">{song.artist || '未知歌手'}</span>
            {recommended ? (
              <span className="shrink-0 text-[10px] text-[var(--brand)]">
                荐
              </span>
            ) : null}
          </span>
        </span>
        {time ? (
          <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
            {time}
          </span>
        ) : null}
      </button>
    </li>
  );
}
