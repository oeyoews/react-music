import Link from 'next/link';
import Image from 'next/image';
import { HeadphonesIcon } from 'lucide-react';
import { formatCount } from '~lib/format';
import { cn } from '~lib/utils';

export type PlaylistCardData = {
  id: number;
  name: string;
  cover: string;
  playCount?: number;
  creator?: string;
  hint?: string;
};

/**
 * 首页歌单卡片：封面 + 播放量角标 + 标题 + 可选副标题。
 * 服务端和客户端共用，避免各处重复写封面逻辑。
 */
export default function PlaylistCard({
  data,
  priority = false,
  className
}: {
  data: PlaylistCardData;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/playlist/${data.id}`}
      title={data.name}
      className={cn('group flex flex-col gap-2', className)}
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/5">
        {data.cover ? (
          <Image
            unoptimized
            src={data.cover}
            alt={data.name}
            width={320}
            height={320}
            priority={priority}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="size-full animate-pulse bg-muted" />
        )}
        {typeof data.playCount === 'number' && (
          <span className="absolute top-1.5 right-1.5 inline-flex items-center gap-1 rounded-full bg-black/45 px-1.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-md">
            <HeadphonesIcon className="size-3" />
            {formatCount(data.playCount)}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <div className="line-clamp-2 text-sm leading-snug text-foreground transition-colors group-hover:text-rose-500">
          {data.name}
        </div>
        {(data.creator || data.hint) && (
          <div className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
            {data.creator ?? data.hint}
          </div>
        )}
      </div>
    </Link>
  );
}
