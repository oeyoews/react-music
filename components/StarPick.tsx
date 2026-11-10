'use client';

import Image from 'next/image';
import { QuoteIcon } from 'lucide-react';
import { useStarPick } from '~lib/hooks';
import { useMusicStore } from '~lib/store';
import SectionHeader from '~components/home/SectionHeader';
import EmptyHint from '~components/home/EmptyHint';
import { Skeleton } from '~components/ui/skeleton';
import { getImageUrl } from '~lib/format';
import { cn } from '~lib/utils';

type StarPickItem = {
  id: string;
  songId: number;
  songName: string;
  cover?: string;
  content: string;
  nickname: string;
  avatarUrl?: string;
};

/**
 * 把接口里层层嵌套的 creative 拍平成渲染需要的最小结构。
 * 任一字段缺失就丢弃该条，避免整块崩掉。
 */
function normalize(data?: IStarPick): StarPickItem[] {
  const creatives = data?.data?.blocks?.[0]?.creatives ?? [];

  return creatives.flatMap((creative) => {
    const resource = creative.resources?.[0];
    const ext = resource?.resourceExtInfo;
    const song = ext?.songData;
    const user = ext?.users?.[0];
    if (!song || !user) return [];

    return [
      {
        id: creative.creativeId,
        songId: song.id,
        songName: song.name,
        cover: getImageUrl(song.album?.picUrl, 200),
        content:
          resource?.uiElement?.mainTitle?.titleDesc ??
          creative.uiElement?.mainTitle?.titleDesc ??
          '',
        nickname: user.nickname,
        avatarUrl: getImageUrl(user.avatarUrl, 48)
      }
    ];
  });
}

export default function StarPick({
  number = 6,
  className
}: {
  number?: number;
  className?: string;
}) {
  const { data, isLoading } = useStarPick();
  const playSong = useMusicStore.use.playSong();
  const items = normalize(data).slice(0, number);
  const toastMessage = data?.data?.pageConfig?.nodataToast;

  return (
    <section className={cn('not-prose', className)}>
      <SectionHeader title="云村星评" hint="乐评精选" href="/starpick" />

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: Math.min(number, 3) }).map((_, index) => (
            <Skeleton key={index} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyHint text={toastMessage || '云村星评暂不可用'} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              title={`${item.songName} - ${item.nickname}`}
              onClick={() =>
                playSong({
                  id: item.songId,
                  name: item.songName,
                  cover: item.cover
                })
              }
              className="group flex flex-col gap-3 rounded-xl bg-card p-4 text-left ring-1 ring-foreground/10 transition-all hover:-translate-y-0.5 hover:ring-foreground/20"
            >
              <QuoteIcon className="size-4 shrink-0 fill-muted-foreground/30 text-muted-foreground/30" />
              <p className="line-clamp-3 text-sm leading-relaxed text-pretty">
                {item.content}
              </p>
              <div className="mt-auto flex items-center gap-2 border-t border-border/60 pt-3">
                {item.cover ? (
                  <Image
                    unoptimized
                    src={item.cover}
                    alt={item.songName}
                    width={32}
                    height={32}
                    className="size-8 shrink-0 rounded-md object-cover"
                  />
                ) : null}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-medium">
                    {item.songName}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    {item.nickname}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
