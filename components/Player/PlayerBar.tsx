'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Howl } from 'howler';
import {
  ListMusicIcon,
  MicVocal,
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  SkipBackIcon,
  SkipForwardIcon,
  Volume2Icon
} from 'lucide-react';
import { useMusicStore } from '~lib/store';
import { useMusicURL } from '~lib/hooks';
import formatTime from '~lib/formatTime';
import { Button } from '@/components/ui/button';
import { cn } from '~lib/utils';
import { PlayQueuePanel } from '~components/Player/PlayQueuePanel';

export function PlayerBar() {
  const queue = useMusicStore.use.queue();
  const currentIndex = useMusicStore.use.currentIndex();
  const isPlaying = useMusicStore.use.isPlaying();
  const loop = useMusicStore.use.loop();
  const volume = useMusicStore.use.volume();
  const progress = useMusicStore.use.progress();
  const duration = useMusicStore.use.duration();
  const togglePlay = useMusicStore.use.togglePlay();
  const next = useMusicStore.use.next();
  const prev = useMusicStore.use.prev();
  const setLoop = useMusicStore.use.setLoop();
  const setVolume = useMusicStore.use.setVolume();
  const setProgress = useMusicStore.use.setProgress();
  const setDuration = useMusicStore.use.setDuration();
  const setIsPlaying = useMusicStore.use.setIsPlaying();

  const current = currentIndex >= 0 ? queue[currentIndex] : undefined;
  const songId = current?.id ? String(current.id) : '';
  const { data: musicData } = useMusicURL(songId);
  const soundRef = useRef<Howl | null>(null);
  const [audioGen, setAudioGen] = useState(0);
  const [showQueue, setShowQueue] = useState(false);
  const setNowPlayingOpen = useMusicStore.use.setNowPlayingOpen();
  const nowPlayingOpen = useMusicStore.use.nowPlayingOpen();
  const seekId = useMusicStore.use.seekId();
  const seekTime = useMusicStore.use.seekTime();
  const appliedSeek = useRef(0);

  const openLyricPage = () => setNowPlayingOpen(true);

  useEffect(() => {
    const url = musicData?.data?.[0]?.url;
    if (!url || !current) return;

    const unload = () => {
      soundRef.current?.unload();
      soundRef.current = null;
    };

    unload();

    const sound = new Howl({
      src: [url],
      html5: true,
      volume,
      onload: () => {
        setDuration(sound.duration());
        setAudioGen((n) => n + 1);
      },
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onend: () => next(),
      onloaderror: () => setIsPlaying(false)
    });

    soundRef.current = sound;

    if (isPlaying) sound.play();

    const timer = window.setInterval(() => {
      if (!sound.playing()) return;
      setProgress(sound.seek() as number);
    }, 200);

    return () => {
      window.clearInterval(timer);
      unload();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicData, current?.id]);

  useEffect(() => {
    if (!soundRef.current) return;
    soundRef.current.volume(volume);
  }, [volume]);

  useEffect(() => {
    appliedSeek.current = seekId;
    // 换曲后不要把上一首的歌词跳转套到新歌上
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id]);

  useEffect(() => {
    if (!seekId || seekId === appliedSeek.current || !soundRef.current) return;
    appliedSeek.current = seekId;
    soundRef.current.seek(seekTime);
    setProgress(seekTime);
    if (!soundRef.current.playing()) soundRef.current.play();
  }, [seekId, seekTime, audioGen, setProgress]);

  useEffect(() => {
    if (!soundRef.current || !current) return;
    if (isPlaying) {
      if (!soundRef.current.playing()) soundRef.current.play();
    } else {
      soundRef.current.pause();
    }
  }, [isPlaying, current?.id]);

  const onSeek = (value: number) => {
    if (!soundRef.current) return;
    soundRef.current.seek(value);
    setProgress(value);
  };

  const cycleLoop = () => {
    const order: Array<'none' | 'all' | 'one'> = ['none', 'all', 'one'];
    const nextMode = order[(order.indexOf(loop) + 1) % order.length];
    setLoop(nextMode);
  };

  if (!current) {
    return (
      <footer className="fixed inset-x-0 bottom-0 z-30 h-[var(--player-bar-height)] border-t border-border bg-background/95 backdrop-blur">
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          选择一首歌曲开始播放
        </div>
      </footer>
    );
  }

  return (
    <>
      {showQueue ? (
        <PlayQueuePanel onClose={() => setShowQueue(false)} />
      ) : null}
      <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-[var(--player-bar-height)] max-w-[1400px] items-center gap-4 px-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {current.cover ? (
              <button
                type="button"
                className="shrink-0 rounded-md"
                aria-label="展开歌词页"
                onClick={openLyricPage}
              >
                <Image
                  unoptimized
                  src={current.cover}
                  alt={current.name}
                  width={56}
                  height={56}
                  className="size-14 rounded-md object-cover"
                />
              </button>
            ) : (
              <Button variant="secondary" size="icon" onClick={togglePlay}>
                {isPlaying ? (
                  <PauseIcon className="size-5" />
                ) : (
                  <PlayIcon className="size-5" />
                )}
              </Button>
            )}
            <MinWidth>
              <button
                type="button"
                className="block w-full truncate text-left text-sm font-medium hover:text-[var(--brand)]"
                onClick={openLyricPage}
              >
                {current.name}
              </button>
              <p className="truncate text-xs text-muted-foreground">
                {current.artist || '未知歌手'}
              </p>
            </MinWidth>
          </div>

          <MinWidth className="flex flex-[1.4] flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon-sm" onClick={cycleLoop}>
                <RepeatIcon
                  className={cn(
                    'size-4',
                    loop !== 'none' && 'text-[var(--brand)]'
                  )}
                />
              </Button>
              <Button variant="ghost" size="icon-sm" onClick={prev}>
                <SkipBackIcon className="size-4" />
              </Button>
              <Button
                size="icon"
                className="size-9 rounded-full bg-[var(--brand)] text-white hover:bg-[var(--brand)]/90"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <PauseIcon className="size-4 fill-current" />
                ) : (
                  <PlayIcon className="size-4 fill-current" />
                )}
              </Button>
              <Button variant="ghost" size="icon-sm" onClick={next}>
                <SkipForwardIcon className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="歌词"
                className={cn(nowPlayingOpen && 'text-[var(--brand)]')}
                onClick={() => {
                  setNowPlayingOpen(!nowPlayingOpen);
                  if (!nowPlayingOpen) setShowQueue(false);
                }}
              >
                <MicVocal className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="播放列表"
                className={cn(showQueue && 'text-[var(--brand)]')}
                onClick={() => {
                  setShowQueue((v) => !v);
                  if (!showQueue) setNowPlayingOpen(false);
                }}
              >
                <ListMusicIcon className="size-4" />
              </Button>
            </div>
            <MinWidth className="flex w-full max-w-xl items-center gap-2 text-[11px] text-muted-foreground">
              <span className="w-10 text-right tabular-nums">
                {formatTime(progress)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 1}
                step={0.1}
                value={progress}
                onChange={(e) => onSeek(Number(e.target.value))}
                className="h-1 flex-1 cursor-pointer accent-[var(--brand)]"
              />
              <span className="w-10 tabular-nums">{formatTime(duration)}</span>
            </MinWidth>
          </MinWidth>

          <MinWidth className="hidden flex-1 items-center justify-end gap-2 md:flex">
            <Volume2Icon className="size-4 text-muted-foreground" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-24 accent-[var(--brand)]"
            />
          </MinWidth>
        </div>
      </footer>
    </>
  );
}

function MinWidth({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('min-w-0', className)}>{children}</div>;
}
