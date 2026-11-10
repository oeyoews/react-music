'use client';

import Link from 'next/link';
import Image from 'next/image';
import Banners from '~components/Banners';
import EmptyHint from '~components/home/EmptyHint';
import BlockSection from '~components/home/BlockSection';
import HorizontalRail from '~components/home/HorizontalRail';
import HomePlaylistCard from '~components/home/HomePlaylistCard';
import SongRow, { SongListRow } from '~components/home/SongRow';
import {
  blockTitleFallback,
  type NormalizedBlock,
  type NormalizedItem
} from '~lib/homepage-block';
import { getImageUrl } from '~lib/format';
import { songIdFromPath } from '~lib/playlist-queue';
import { useMusicStore } from '~lib/store';
import { cn } from '~lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const unsupportedShows = new Set([
  'SLIDE_PODCAST_VOICE_MORE_TAB',
  'SLIDE_PLAYABLE_DRAGON_BALL_NEW_BROADCAST'
]);

const knownShows = new Set([
  'BANNER',
  'DRAGON_BALL',
  'HOMEPAGE_SLIDE_PLAYLIST',
  'HOMEPAGE_SLIDE_SONGLIST_ALIGN',
  'HOMEPAGE_NEW_SONG_NEW_ALBUM',
  'HOT_TOPIC',
  'SHUFFLE_MUSIC_CALENDAR',
  'YUNCUN_PRODUCED',
  'NEW_HOT_COMMENT_WHITE_SKIN',
  ...unsupportedShows
]);

function DragonBall({ items }: { items: NormalizedItem[] }) {
  const hero = items[0];
  if (!hero) return null;
  const tiles = items.slice(1, 5);

  return (
    <BlockSection title="精选推荐">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <PlayOrLink
          item={hero}
          className="relative overflow-hidden rounded-2xl bg-muted text-left ring-1 ring-foreground/5"
        >
          <DragonBallArt item={hero} size="hero" priority />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="pointer-events-none absolute bottom-4 left-4 text-white">
            <p className="text-2xl font-semibold">{hero.title || '每日推荐'}</p>
            <p className="text-sm text-white/80">
              {hero.subtitle || '根据你的口味生成'}
            </p>
          </div>
        </PlayOrLink>
        <div className="grid grid-cols-2 gap-3">
          {tiles.length === 0 ? (
            <PlaceholderTile className="col-span-2" />
          ) : (
            tiles.map((card) => (
              <PlayOrLink
                key={card.id}
                item={card}
                className="relative overflow-hidden rounded-xl bg-muted text-left ring-1 ring-foreground/5"
              >
                <DragonBallArt item={card} size="tile" />
                <span className="pointer-events-none absolute bottom-2 left-2 text-xs font-medium text-white drop-shadow">
                  {card.title || '推荐'}
                </span>
              </PlayOrLink>
            ))
          )}
        </div>
      </div>
    </BlockSection>
  );
}

function DragonBallArt({
  item,
  size,
  priority
}: {
  item: NormalizedItem;
  size: 'hero' | 'tile';
  priority?: boolean;
}) {
  const isIconBall = item.kind === 'dragon_ball';
  const imgSize = size === 'hero' ? 480 : 240;
  const src = item.image
    ? getImageUrl(item.image, imgSize) || item.image
    : undefined;

  if (!src) {
    return (
      <div
        className={
          size === 'hero'
            ? 'aspect-[21/9] w-full bg-muted'
            : 'aspect-[4/3] w-full'
        }
      />
    );
  }

  return (
    <div
      className={
        size === 'hero'
          ? 'relative aspect-[21/9] w-full bg-gradient-to-br from-[var(--brand)]/30 via-muted to-muted'
          : 'relative aspect-[4/3] w-full bg-gradient-to-br from-foreground/10 to-muted'
      }
    >
      <Image
        unoptimized
        src={src}
        alt={item.title}
        width={size === 'hero' ? 900 : 320}
        height={size === 'hero' ? 420 : 240}
        priority={priority}
        loading={priority ? 'eager' : undefined}
        fetchPriority={priority ? 'high' : undefined}
        className={
          isIconBall
            ? size === 'hero'
              ? 'absolute inset-0 m-auto size-[min(42%,10rem)] object-contain'
              : 'absolute inset-0 m-auto size-[min(55%,5.5rem)] object-contain'
            : size === 'hero'
              ? 'size-full object-cover'
              : 'size-full object-cover'
        }
      />
    </div>
  );
}

function PlaylistRail({
  block,
  title
}: {
  block: NormalizedBlock;
  title?: string;
}) {
  const sectionTitle =
    title || block.title || blockTitleFallback(block.key, block.showType);
  return (
    <BlockSection title={sectionTitle}>
      <HorizontalRail>
        {block.items.map((item) => (
          <HomePlaylistCard key={item.id} item={item} />
        ))}
      </HorizontalRail>
    </BlockSection>
  );
}

function StyleSongs({ block }: { block: NormalizedBlock }) {
  const title =
    block.title || blockTitleFallback(block.key, block.showType) || '为你定制';
  return (
    <BlockSection title={title}>
      <HorizontalRail>
        {block.items.map((item, index) => (
          <SongRow key={item.id} item={item} index={index} />
        ))}
      </HorizontalRail>
    </BlockSection>
  );
}

function NewSongAlbum({ block }: { block: NormalizedBlock }) {
  const songs = block.items.filter(
    (i) => i.kind === 'song' || i.resourceType === 'song'
  );
  const albums = block.items.filter(
    (i) => i.kind === 'album' || i.resourceType?.includes('album')
  );

  return (
    <BlockSection title={block.title || '新歌新碟'}>
      <Tabs defaultValue="song">
        <TabsList>
          <TabsTrigger value="song">新歌</TabsTrigger>
          <TabsTrigger value="album">新碟</TabsTrigger>
        </TabsList>
        <TabsContent value="song">
          {songs.length === 0 ? (
            <EmptyHint text="暂无新歌" />
          ) : (
            <ul className="grid gap-1 md:grid-cols-2">
              {songs.slice(0, 12).map((item) => (
                <SongListRow key={item.id} item={item} />
              ))}
            </ul>
          )}
        </TabsContent>
        <TabsContent value="album">
          {albums.length === 0 ? (
            <EmptyHint text="暂无新碟" />
          ) : (
            <HorizontalRail>
              {albums.map((item) => (
                <HomePlaylistCard key={item.id} item={item} />
              ))}
            </HorizontalRail>
          )}
        </TabsContent>
      </Tabs>
    </BlockSection>
  );
}

function TopicRail({ block }: { block: NormalizedBlock }) {
  return (
    <BlockSection title={block.title || '热门话题'}>
      <HorizontalRail>
        {block.items.map((item) => (
          <Link
            key={item.id}
            href={item.href || '/starpick'}
            className="relative w-[260px] shrink-0 overflow-hidden rounded-xl"
          >
            {item.image ? (
              <Image
                unoptimized
                src={getImageUrl(item.image, 520) || item.image}
                alt={item.title}
                width={260}
                height={140}
                className="aspect-[16/9] w-full object-cover"
              />
            ) : (
              <div className="aspect-[16/9] bg-muted" />
            )}
            <h3 className="mt-2 line-clamp-2 text-sm font-medium">
              {item.title}
            </h3>
            {item.subtitle ? (
              <p className="text-xs text-muted-foreground">{item.subtitle}</p>
            ) : null}
          </Link>
        ))}
      </HorizontalRail>
    </BlockSection>
  );
}

function CommentCards({ block }: { block: NormalizedBlock }) {
  return (
    <BlockSection
      title={block.title || '热评歌曲'}
      action={{ href: '/starpick', label: '更多' }}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {block.items.map((item) => (
          <PlayOrLink
            key={item.id}
            item={item}
            className="rounded-xl bg-card p-4 text-left ring-1 ring-foreground/10"
          >
            <p className="line-clamp-4 text-sm leading-relaxed text-pretty">
              {item.desc || item.title}
            </p>
            <p className="mt-3 truncate text-xs text-muted-foreground">
              {item.subtitle}
            </p>
          </PlayOrLink>
        ))}
      </div>
    </BlockSection>
  );
}

function UnsupportedBlock({ title }: { title: string }) {
  return (
    <BlockSection title={title}>
      <EmptyHint text="该模块在网页端暂不支持，敬请期待" />
    </BlockSection>
  );
}

export default function HomeFeed({
  banners,
  blocks
}: {
  banners: Banner[];
  blocks: NormalizedBlock[];
}) {
  const hasBannerBlock = blocks.some((b) => b.key === 'HOMEPAGE_BANNER');

  return (
    <div className="space-y-10">
      <Banners data={banners} />
      {blocks.map((block) => {
        if (block.key === 'HOMEPAGE_BANNER' && hasBannerBlock) {
          return null;
        }

        const title =
          block.title || blockTitleFallback(block.key, block.showType);

        if (!knownShows.has(block.showType)) {
          console.log(
            '[HomeFeed] unknown showType:',
            block.showType,
            block.key
          );
          return null;
        }

        if (unsupportedShows.has(block.showType)) {
          return <UnsupportedBlock key={block.key} title={title} />;
        }

        switch (block.showType) {
          case 'DRAGON_BALL':
            return <DragonBall key={block.key} items={block.items} />;
          case 'HOMEPAGE_SLIDE_PLAYLIST':
            return <PlaylistRail key={block.key} block={block} />;
          case 'HOMEPAGE_SLIDE_SONGLIST_ALIGN':
            return <StyleSongs key={block.key} block={block} />;
          case 'HOMEPAGE_NEW_SONG_NEW_ALBUM':
            return <NewSongAlbum key={block.key} block={block} />;
          case 'HOT_TOPIC':
            return <TopicRail key={block.key} block={block} />;
          case 'SHUFFLE_MUSIC_CALENDAR':
            return <TopicRail key={block.key} block={block} />;
          case 'YUNCUN_PRODUCED':
            return <PlaylistRail key={block.key} block={block} title={title} />;
          case 'NEW_HOT_COMMENT_WHITE_SKIN':
            return <CommentCards key={block.key} block={block} />;
          default:
            return null;
        }
      })}
      {blocks.length === 0 && !banners?.length ? (
        <EmptyHint text="首页内容加载失败，请确认本地音乐 API 已启动" />
      ) : null}
    </div>
  );
}

function PlaceholderTile({ className }: { className?: string }) {
  return <div className={cn('aspect-[4/3] w-full bg-muted', className)} />;
}

function PlayOrLink({
  item,
  className,
  children
}: {
  item: NormalizedItem;
  className?: string;
  children: React.ReactNode;
}) {
  const playSong = useMusicStore.use.playSong();
  const songId = item.songId || songIdFromPath(item.href);
  const blocked =
    item.kind === 'playlist' ||
    item.kind === 'album' ||
    item.kind === 'mv' ||
    item.kind === 'topic' ||
    item.kind === 'external';

  if (songId && !blocked) {
    return (
      <button
        type="button"
        className={className}
        onClick={() =>
          playSong({
            id: songId,
            name:
              item.kind === 'comment'
                ? item.subtitle || item.title
                : item.title,
            artist: item.kind === 'comment' ? undefined : item.subtitle,
            cover: getImageUrl(item.image, 200)
          })
        }
      >
        {children}
      </button>
    );
  }

  return (
    <Link href={item.href || '/'} className={className}>
      {children}
    </Link>
  );
}
