'use client';

import { useEffect, useMemo, useRef } from 'react';
import { XIcon } from 'lucide-react';
import { useLyric } from '~lib/hooks';
import { activeLrcIndex, parseLrc } from '~lib/lrc';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '~lib/utils';

export function LyricPanel({
  songId,
  songName,
  progress,
  open,
  onClose
}: {
  songId: string;
  songName?: string;
  progress: number;
  open: boolean;
  onClose: () => void;
}) {
  const { data, isLoading } = useLyric(songId);
  const listRef = useRef<HTMLUListElement>(null);
  const activeRef = useRef<HTMLLIElement>(null);

  const lines = useMemo(() => parseLrc(data?.lrc?.lyric), [data]);

  const active = activeLrcIndex(lines, progress);

  useEffect(() => {
    if (!open || active < 0 || !activeRef.current || !listRef.current) return;
    activeRef.current.scrollIntoView({
      block: 'center',
      behavior: 'smooth'
    });
  }, [active, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-[var(--player-bar-height)] z-40 border-t border-border bg-background/95 backdrop-blur"
      role="region"
      aria-label="歌词"
    >
      <div className="mx-auto flex max-h-[min(42vh,360px)] max-w-2xl flex-col px-4 py-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium">{songName || '歌词'}</p>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="关闭歌词"
          >
            <XIcon className="size-4" />
          </Button>
        </div>

        <ul
          ref={listRef}
          className="flex-1 overflow-y-auto py-6 text-center text-sm leading-8"
        >
          {isLoading ? (
            <li className="flex justify-center py-8">
              <Spinner className="size-5" />
            </li>
          ) : lines.length === 0 ? (
            <li className="py-8 text-muted-foreground">暂无歌词</li>
          ) : (
            lines.map((line, index) => {
              const isActive = index === active;
              return (
                <li
                  key={`${line.time}-${index}`}
                  ref={isActive ? activeRef : undefined}
                  className={cn(
                    'px-2 transition-all duration-200',
                    isActive
                      ? 'scale-105 text-base font-semibold text-[var(--brand)]'
                      : 'text-muted-foreground'
                  )}
                >
                  {line.text}
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
