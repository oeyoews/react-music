'use client';

import useSWR from 'swr';
import { PlayIcon } from 'lucide-react';
import { getRecommendations } from '~lib/search';
import { useCookie } from '~lib/hooks/useCookie';
import { formatDuration } from '~lib/format';
import { toQueueSong } from '~lib/playlist-queue';
import { useMusicStore } from '~lib/store';
import SectionHeader from '~components/home/SectionHeader';
import EmptyHint from '~components/home/EmptyHint';
import { Skeleton } from '~components/ui/skeleton';

const RECOMMEND_LIMIT = 12;

function RecommendSkeleton() {
  return (
    <div className="grid gap-2 md:grid-cols-2">
      {Array.from({ length: RECOMMEND_LIMIT }).map((_, index) => (
        <div key={index} className="flex items-center gap-3 py-2">
          <Skeleton className="size-10 shrink-0 rounded-md" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RecommendSongs() {
  const cookie = useCookie();
  const playSong = useMusicStore.use.playSong();

  // cookie 就绪前不发请求，避免拿空 cookie 请求一次必然失败。
  const { data, isLoading } = useSWR(
    cookie ? ['recommendations', cookie] : null,
    () => getRecommendations(cookie),
    { revalidateOnFocus: false }
  );

  const songs = data?.data?.dailySongs ?? [];
  const visible = songs.slice(0, RECOMMEND_LIMIT);
  const queue = visible.map((song) => toQueueSong(song));

  return (
    <section className="not-prose">
      <SectionHeader
        title="每日推荐"
        hint={songs.length > 0 ? `共 ${songs.length} 首` : '登录后可获取'}
      />

      {!cookie || isLoading ? (
        <RecommendSkeleton />
      ) : songs.length === 0 ? (
        <EmptyHint text="登录网易云账号后可获取每日推荐歌曲" />
      ) : (
        <ol className="grid gap-x-6 gap-y-1 md:grid-cols-2">
          {visible.map((song, index) => (
            <li key={song.id}>
              <button
                type="button"
                onClick={() => {
                  const target = queue[index];
                  if (!target) return;
                  playSong(target, queue);
                }}
                className="group flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-muted"
              >
                <span className="w-5 shrink-0 text-center text-xs text-muted-foreground tabular-nums group-hover:hidden">
                  {index + 1}
                </span>
                <PlayIcon className="hidden size-3.5 w-5 shrink-0 fill-foreground group-hover:block" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="truncate text-sm">{song.name}</span>
                    {song.ar?.length > 0 && (
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {song.ar.map((artist) => artist.name).join(' / ')}
                      </span>
                    )}
                  </div>
                  {song.recommendReason && (
                    <div className="truncate text-xs text-rose-400">
                      {song.recommendReason}
                    </div>
                  )}
                </div>
                <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                  {formatDuration(song.dt)}
                </span>
              </button>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
