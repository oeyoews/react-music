'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Route } from 'next';
import { getRoute } from '~lib/getRoute';
import { getSongDetail } from '~lib/search';
import { toQueueSong } from '~lib/playlist-queue';
import { useMusicStore } from '~lib/store';
import { cn } from '~lib/utils';
import toast from 'react-hot-toast';
import EmptyHint from './home/EmptyHint';

const ROTATE_MS = 5000;

/** 顶栏行高贴近客户端（左轮播 + 右副图） */
const ROW_HEIGHT = 'h-[168px] sm:h-[180px] md:h-[196px]';

const slideShell = cn(
  'relative h-full min-h-0 w-full overflow-hidden rounded-xl',
  'bg-muted ring-1 ring-foreground/5'
);

/**
 * 首页焦点图：左侧轮播，右侧两张副图（大屏）。
 */
export default function Banners({ data }: { data: Banner[] }) {
  const banners = (data ?? []).slice(0, 9);
  const sideBanners = banners.slice(1, 3);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeIndex =
    banners.length > 0
      ? ((index % banners.length) + banners.length) % banners.length
      : 0;

  const goTo = useCallback(
    (next: number) => {
      if (banners.length === 0) return;
      setIndex(((next % banners.length) + banners.length) % banners.length);
    },
    [banners.length]
  );

  useEffect(() => {
    if (banners.length <= 1 || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % banners.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [banners.length, paused]);

  if (banners.length === 0) {
    return <EmptyHint text="暂无焦点图" className={cn('w-full', ROW_HEIGHT)} />;
  }

  const hasSide = sideBanners.length > 0;

  return (
    <div
      className={cn(
        'not-prose grid min-h-0 gap-2',
        ROW_HEIGHT,
        hasSide && 'lg:grid-cols-[minmax(0,1.62fr)_minmax(0,1fr)]'
      )}
    >
      <div
        className={cn(slideShell, 'group min-h-0')}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setPaused(false);
          }
        }}
        aria-roledescription="carousel"
        aria-label="首页焦点图"
      >
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
        >
          {banners.map((banner, i) => (
            <BannerSlide
              key={banner.imageUrl}
              banner={banner}
              showTypeBadge
              priority={i === 0}
              className="h-full w-full shrink-0"
            />
          ))}
        </div>

        {banners.length > 1 ? (
          <div className="pointer-events-none absolute inset-0 z-20">
            <div className="pointer-events-auto absolute bottom-2.5 left-3 flex items-center gap-1.5">
              {banners.map((banner, i) => (
                <button
                  key={banner.imageUrl}
                  type="button"
                  aria-label={`第 ${i + 1} 张焦点图`}
                  aria-current={i === activeIndex ? 'true' : undefined}
                  onClick={() => goTo(i)}
                  className={cn(
                    'size-1.5 rounded-full transition-colors',
                    i === activeIndex
                      ? 'bg-white shadow-sm'
                      : 'bg-white/45 hover:bg-white/70'
                  )}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {hasSide ? (
        <div
          className={cn(
            'hidden min-h-0 gap-2 lg:grid',
            sideBanners.length >= 2 ? 'grid-rows-2' : 'grid-rows-1'
          )}
        >
          {sideBanners.map((banner, i) => (
            <BannerSlide
              key={banner.imageUrl}
              banner={banner}
              priority={i === 0}
              className="h-full min-h-0"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function BannerSlide({
  banner,
  priority,
  showTypeBadge,
  className
}: {
  banner: Banner;
  priority: boolean;
  showTypeBadge?: boolean;
  className?: string;
}) {
  const playSong = useMusicStore.use.playSong();
  const href = getRoute(banner);
  const isExternal = typeof href === 'string' && href.startsWith('http');
  const isSong = banner.targetType === 1 && Boolean(banner.targetId);

  const frame = (
    <div className={cn(slideShell, 'group h-full w-full')}>
      <Image
        unoptimized
        src={banner.imageUrl}
        alt={banner.typeTitle || '焦点图'}
        title={banner.typeTitle}
        width={1080}
        height={420}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        sizes="(max-width: 1024px) 100vw, 62vw"
        className="size-full object-cover object-center"
      />
      {showTypeBadge && banner.typeTitle ? (
        <span className="absolute bottom-2 right-2 z-10 max-w-[45%] truncate rounded-md bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm sm:text-xs">
          {banner.typeTitle}
        </span>
      ) : null}
    </div>
  );

  const shellClass = cn('block h-full min-h-0', className);

  if (isSong) {
    return (
      <button
        type="button"
        className={shellClass}
        onClick={() => {
          void getSongDetail(banner.targetId).then((detail) => {
            const song = detail?.songs?.[0];
            if (!song) {
              toast.error('暂时无法播放这首歌');
              return;
            }
            playSong(toQueueSong(song, banner.imageUrl));
          });
        }}
      >
        {frame}
      </button>
    );
  }

  if (!href) {
    return <div className={shellClass}>{frame}</div>;
  }

  return (
    <Link
      href={href as Route}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className={shellClass}
    >
      {frame}
    </Link>
  );
}
