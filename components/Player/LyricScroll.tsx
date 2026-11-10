'use client';

import { useEffect, useMemo, useRef } from 'react';
import { PlayIcon } from 'lucide-react';
import { useLyric } from '~lib/hooks';
import { activeLrcIndex, parseLrc, type LrcLine } from '~lib/lrc';
import { useMusicStore } from '~lib/store';
import formatTime from '~lib/formatTime';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '~lib/utils';

export function LyricScroll({
  songId,
  progress,
  variant = 'panel'
}: {
  songId: string;
  progress: number;
  variant?: 'panel' | 'fullscreen';
}) {
  const { data, isLoading } = useLyric(songId);
  const seekTo = useMusicStore.use.seekTo();
  const listRef = useRef<HTMLUListElement>(null);
  const activeRef = useRef<HTMLLIElement>(null);
  const linesRef = useRef<LrcLine[]>([]);
  const userHold = useRef(false);
  const followLock = useRef(false);
  const settleTimer = useRef<number | null>(null);

  const lines = useMemo(() => parseLrc(data?.lrc?.lyric), [data]);
  linesRef.current = lines;
  const active = activeLrcIndex(lines, progress);
  const isFullscreen = variant === 'fullscreen';

  useEffect(() => {
    if (userHold.current || followLock.current) return;
    if (active < 0 || !activeRef.current) return;
    followLock.current = true;
    activeRef.current.scrollIntoView({
      block: 'center',
      behavior: 'smooth'
    });
    const timer = window.setTimeout(() => {
      followLock.current = false;
    }, 700);
    return () => window.clearTimeout(timer);
  }, [active]);

  useEffect(() => {
    return () => {
      if (settleTimer.current) window.clearTimeout(settleTimer.current);
    };
  }, []);

  const seekLineNearCenter = () => {
    const list = listRef.current;
    const currentLines = linesRef.current;
    if (!list || currentLines.length === 0) return;

    const mid = list.scrollTop + list.clientHeight / 2;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    list.querySelectorAll<HTMLElement>('[data-lyric-index]').forEach((el) => {
      const index = Number(el.dataset.lyricIndex);
      const center = el.offsetTop + el.offsetHeight / 2;
      const dist = Math.abs(center - mid);
      if (dist < bestDist && Number.isFinite(index)) {
        bestDist = dist;
        best = index;
      }
    });

    const line = currentLines[best];
    if (!line) return;
    followLock.current = true;
    seekTo(line.time);
    window.setTimeout(() => {
      followLock.current = false;
      userHold.current = false;
    }, 700);
  };

  const onScroll = () => {
    if (followLock.current) return;
    userHold.current = true;
    if (settleTimer.current) window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(seekLineNearCenter, 180);
  };

  return (
    <ul
      ref={listRef}
      onScroll={onScroll}
      onWheel={() => {
        userHold.current = true;
      }}
      onTouchStart={() => {
        userHold.current = true;
      }}
      className={cn(
        'min-h-0 overflow-x-hidden overflow-y-auto overscroll-contain',
        isFullscreen
          ? 'h-full flex-1 space-y-4 py-8 text-lg leading-relaxed'
          : 'py-6 text-center text-sm leading-8'
      )}
    >
      {isLoading ? (
        <li className="flex justify-center py-12">
          <Spinner className="size-5" />
        </li>
      ) : lines.length === 0 ? (
        <li className="py-12 text-muted-foreground">暂无歌词</li>
      ) : (
        lines.map((line, index) => {
          const isActive = index === active;
          return (
            <li
              key={`${line.time}-${index}`}
              ref={isActive ? activeRef : undefined}
              data-lyric-index={index}
              className="group relative"
            >
              <button
                type="button"
                onClick={() => seekTo(line.time)}
                className={cn(
                  'block w-full min-w-0 [overflow-wrap:anywhere] break-words transition-all duration-300',
                  isFullscreen
                    ? cn(
                        'py-0.5 pr-16 text-left',
                        isActive
                          ? 'text-xl font-semibold text-[var(--brand)]'
                          : 'text-base text-muted-foreground/65 hover:text-foreground'
                      )
                    : cn(
                        'px-2',
                        isActive
                          ? 'scale-105 text-base font-semibold text-[var(--brand)]'
                          : 'text-muted-foreground hover:text-foreground'
                      )
                )}
              >
                {line.text}
              </button>
              {isFullscreen ? (
                <span
                  className={cn(
                    'pointer-events-none absolute top-1/2 right-0 inline-flex -translate-y-1/2 items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground tabular-nums',
                    isActive
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100'
                  )}
                >
                  <PlayIcon className="size-3 shrink-0 fill-current" />
                  {formatTime(line.time)}
                </span>
              ) : null}
            </li>
          );
        })
      )}
    </ul>
  );
}
