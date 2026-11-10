'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ChevronRight, HeadphonesIcon, PlayIcon } from 'lucide-react';

import SkeletonSongs from '~components/ui/SkeletonSongs';
import { Button } from '@/components/ui/button';
import {
  useSearchCloudTab,
  useSearchOverview
} from '~lib/hooks/useSearchResults';
import { formatCount, getImageUrl } from '~lib/format';
import { toQueueSong } from '~lib/playlist-queue';
import { useMusicStore } from '~lib/store';
import { cn } from '~lib/utils';

type SearchTabId =
  | 'composite'
  | 'song'
  | 'playlist'
  | 'artist'
  | 'voice'
  | 'podcast'
  | 'lyric'
  | 'album'
  | 'user';

const SEARCH_TABS: { id: SearchTabId; label: string }[] = [
  { id: 'composite', label: '综合' },
  { id: 'song', label: '单曲' },
  { id: 'playlist', label: '歌单' },
  { id: 'artist', label: '歌手' },
  { id: 'voice', label: '声音' },
  { id: 'podcast', label: '播客' },
  { id: 'lyric', label: '歌词' },
  { id: 'album', label: '专辑' },
  { id: 'user', label: '用户' }
];

type LooseSong = {
  id: number;
  name: string;
  dt?: number;
  ar?: { id?: number; name?: string }[];
  artists?: { id?: number; name?: string }[];
  al?: { picUrl?: string };
  album?: { picUrl?: string };
  sq?: { br?: number };
  hr?: { br?: number };
  fee?: number;
};

function songArtists(song: LooseSong) {
  const fromAr = song.ar
    ?.map((a) => a.name)
    .filter(Boolean)
    .join(' / ');
  if (fromAr) {
    return fromAr;
  }
  return (
    song.artists
      ?.map((a) => a.name)
      .filter(Boolean)
      .join(' / ') ?? ''
  );
}

function hasLossless(song: LooseSong) {
  return Boolean(song.sq?.br || song.hr?.br);
}

function pickHighlightArtist(
  songs: LooseSong[],
  artists: CloudSearchArtist[]
): CloudSearchArtist | null {
  const primaryId = songs[0]?.ar?.[0]?.id ?? songs[0]?.artists?.[0]?.id;
  if (primaryId) {
    const matched = artists.find((a) => a.id === primaryId);
    if (matched) {
      return matched;
    }
    const name = songs[0]?.ar?.[0]?.name ?? songs[0]?.artists?.[0]?.name;
    if (name) {
      return {
        id: primaryId,
        name,
        musicSize: undefined,
        albumSize: undefined,
        picUrl: songs[0]?.al?.picUrl ?? songs[0]?.album?.picUrl
      };
    }
  }
  return artists[0] ?? null;
}

function SearchEmpty({ text = '暂无相关内容' }: { text?: string }) {
  return (
    <p className="py-16 text-center text-sm text-muted-foreground">{text}</p>
  );
}

function SectionHeading({
  title,
  onPlay,
  showPlay
}: {
  title: string;
  onPlay?: () => void;
  showPlay?: boolean;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h3 className="flex items-center gap-0.5 text-lg font-semibold">
        {title}
        <ChevronRight className="size-4 text-muted-foreground" />
      </h3>
      {showPlay && onPlay ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={onPlay}
        >
          <PlayIcon className="size-3.5" />
          播放
        </Button>
      ) : null}
    </div>
  );
}

function SongRows({
  songs,
  startIndex = 0,
  onPlay
}: {
  songs: LooseSong[];
  startIndex?: number;
  onPlay: (song: LooseSong, index: number) => void;
}) {
  if (songs.length === 0) {
    return <SearchEmpty text="没有找到相关单曲" />;
  }

  return (
    <ul className="grid list-none gap-x-10 gap-y-1 lg:grid-cols-2">
      {songs.map((song, index) => (
        <li key={song.id}>
          <button
            type="button"
            className="group flex w-full items-center gap-2 rounded-lg px-1 py-2 text-left text-sm hover:bg-muted/60"
            onClick={() => onPlay(song, index)}
          >
            <span className="w-7 shrink-0 text-muted-foreground tabular-nums">
              {startIndex + index + 1}.
            </span>
            <span className="min-w-0 flex-1 truncate">
              <span className="text-foreground group-hover:text-[var(--brand)]">
                {song.name}
              </span>
              {songArtists(song) ? (
                <span className="text-muted-foreground">
                  {' '}
                  / {songArtists(song)}
                </span>
              ) : null}
            </span>
            {hasLossless(song) ? (
              <span className="shrink-0 rounded border border-border px-1 text-[10px] text-muted-foreground">
                SQ
              </span>
            ) : null}
          </button>
        </li>
      ))}
    </ul>
  );
}

function PlaylistStrip({ playlists }: { playlists: Playlist[] }) {
  if (playlists.length === 0) {
    return null;
  }

  return (
    <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-1">
      {playlists.map((pl) => {
        const cover = getImageUrl(pl.coverImgUrl, 200) || pl.coverImgUrl;
        return (
          <Link
            key={pl.id}
            href={`/playlist/${pl.id}`}
            className="group w-[148px] shrink-0"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted ring-1 ring-foreground/5">
              {cover ? (
                <Image
                  unoptimized
                  src={cover}
                  alt={pl.name}
                  width={148}
                  height={148}
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="size-full bg-muted" />
              )}
              {typeof pl.playCount === 'number' ? (
                <span className="absolute top-1.5 right-1.5 inline-flex items-center gap-0.5 rounded-sm bg-black/50 px-1 py-0.5 text-[10px] text-white">
                  <HeadphonesIcon className="size-3" />
                  {formatCount(pl.playCount)}
                </span>
              ) : null}
            </div>
            <p className="mt-2 line-clamp-2 text-sm leading-snug">{pl.name}</p>
            {pl.creator?.nickname ? (
              <p className="line-clamp-1 text-xs text-muted-foreground">
                {pl.creator.nickname}
              </p>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}

export const SearchResult = ({ searchWord }: { searchWord: string }) => {
  const playSong = useMusicStore.use.playSong();
  const [tab, setTab] = useState<SearchTabId>('composite');

  const { data, isLoading } = useSearchOverview(searchWord);
  const lyricEnabled = tab === 'lyric';
  const userEnabled = tab === 'user';
  const { data: lyricResult, isLoading: lyricLoading } = useSearchCloudTab(
    searchWord,
    1006,
    lyricEnabled,
    30
  );
  const { data: userResult, isLoading: userLoading } = useSearchCloudTab(
    searchWord,
    1002,
    userEnabled,
    20
  );

  const songs = data?.songs ?? [];
  const playlists = data?.playlists ?? [];
  const artists = data?.artists ?? [];
  const albums = data?.albums ?? [];

  const highlightArtist = useMemo(
    () => pickHighlightArtist(songs, artists),
    [songs, artists]
  );
  const highlightPlaylist = playlists[0];

  const playAt = (list: LooseSong[], index: number) => {
    const queue = list.map((s) => toQueueSong(s));
    const target = queue[index];
    if (!target) {
      return;
    }
    playSong(target, queue);
  };

  const playAllSongs = (list: LooseSong[]) => {
    if (list.length === 0) {
      return;
    }
    playAt(list, 0);
  };

  if (isLoading && !data) {
    return <SkeletonSongs count={12} />;
  }

  const compositeSongs = songs.slice(0, 10);

  return (
    <section className="pb-12">
      <h1 className="mt-2 text-2xl font-bold tracking-tight">
        {searchWord}
        <span className="text-lg font-normal text-muted-foreground">
          {' '}
          的相关搜索如下
        </span>
      </h1>

      <nav
        className="mt-6 flex gap-6 overflow-x-auto border-b border-border/70"
        aria-label="搜索结果分类"
      >
        {SEARCH_TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={cn(
              'shrink-0 pb-2.5 text-sm transition-colors',
              tab === item.id
                ? 'border-b-2 border-[var(--brand)] font-medium text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-8">
        {tab === 'composite' ? (
          <div className="space-y-10">
            {highlightArtist || highlightPlaylist ? (
              <div className="grid gap-6 md:grid-cols-2">
                {highlightArtist ? (
                  <Link
                    href={`/artist/${highlightArtist.id}`}
                    className="flex items-center gap-4 rounded-xl border border-border/60 bg-card p-4 transition-colors hover:bg-muted/30"
                  >
                    <div className="size-[72px] shrink-0 overflow-hidden rounded-full bg-muted">
                      {highlightArtist.picUrl || highlightArtist.img1v1Url ? (
                        <Image
                          unoptimized
                          src={
                            getImageUrl(
                              highlightArtist.picUrl ||
                                highlightArtist.img1v1Url,
                              144
                            ) ||
                            highlightArtist.picUrl ||
                            highlightArtist.img1v1Url ||
                            ''
                          }
                          alt={highlightArtist.name}
                          width={72}
                          height={72}
                          className="size-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">歌手</p>
                      <p className="truncate text-base font-medium">
                        {highlightArtist.name}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {typeof highlightArtist.musicSize === 'number'
                          ? `单曲：${highlightArtist.musicSize}`
                          : null}
                        {typeof highlightArtist.fansSize === 'number' ? (
                          <> 粉丝：{formatCount(highlightArtist.fansSize)}</>
                        ) : null}
                      </p>
                    </div>
                  </Link>
                ) : null}

                {highlightPlaylist ? (
                  <Link
                    href={`/playlist/${highlightPlaylist.id}`}
                    className="flex items-center gap-4 rounded-xl border border-border/60 bg-card p-4 transition-colors hover:bg-muted/30"
                  >
                    <div className="size-[72px] shrink-0 overflow-hidden rounded-lg bg-muted">
                      {highlightPlaylist.coverImgUrl ? (
                        <Image
                          unoptimized
                          src={
                            getImageUrl(highlightPlaylist.coverImgUrl, 144) ||
                            highlightPlaylist.coverImgUrl
                          }
                          alt={highlightPlaylist.name}
                          width={72}
                          height={72}
                          className="size-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">歌单</p>
                      <p className="line-clamp-2 text-base font-medium">
                        {highlightPlaylist.name}
                      </p>
                      {highlightPlaylist.creator?.nickname ? (
                        <p className="mt-1 truncate text-xs text-muted-foreground">
                          {highlightPlaylist.creator.nickname}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                ) : null}
              </div>
            ) : null}

            <div>
              <SectionHeading
                title="单曲"
                showPlay={compositeSongs.length > 0}
                onPlay={() => playAllSongs(compositeSongs)}
              />
              <SongRows
                songs={compositeSongs}
                onPlay={(song, index) => playAt(compositeSongs, index)}
              />
            </div>

            {playlists.length > 0 ? (
              <div>
                <SectionHeading title="歌单" />
                <PlaylistStrip playlists={playlists.slice(0, 12)} />
              </div>
            ) : null}
          </div>
        ) : null}

        {tab === 'song' ? (
          <SongRows songs={songs} onPlay={(s, i) => playAt(songs, i)} />
        ) : null}

        {tab === 'playlist' ? (
          playlists.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {playlists.map((pl) => {
                const cover =
                  getImageUrl(pl.coverImgUrl, 240) || pl.coverImgUrl;
                return (
                  <Link
                    key={pl.id}
                    href={`/playlist/${pl.id}`}
                    className="group block"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-muted ring-1 ring-foreground/5">
                      {cover ? (
                        <Image
                          unoptimized
                          src={cover}
                          alt={pl.name}
                          width={200}
                          height={200}
                          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : null}
                      {typeof pl.playCount === 'number' ? (
                        <span className="absolute top-1.5 right-1.5 inline-flex items-center gap-0.5 rounded-sm bg-black/50 px-1 py-0.5 text-[10px] text-white">
                          <HeadphonesIcon className="size-3" />
                          {formatCount(pl.playCount)}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm">{pl.name}</p>
                    {pl.creator?.nickname ? (
                      <p className="line-clamp-1 text-xs text-muted-foreground">
                        {pl.creator.nickname}
                      </p>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          ) : (
            <SearchEmpty text="没有找到相关歌单" />
          )
        ) : null}

        {tab === 'artist' ? (
          artists.length > 0 ? (
            <ul className="grid gap-3 sm:grid-cols-2">
              {artists.map((artist) => (
                <li key={artist.id}>
                  <Link
                    href={`/artist/${artist.id}`}
                    className="flex items-center gap-3 rounded-xl border border-border/60 p-3 hover:bg-muted/40"
                  >
                    <SearchArtistAvatar artist={artist} />
                    <div className="min-w-0">
                      <p className="truncate font-medium">{artist.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {typeof artist.musicSize === 'number'
                          ? `单曲 ${artist.musicSize}`
                          : ''}
                        {typeof artist.albumSize === 'number'
                          ? ` · 专辑 ${artist.albumSize}`
                          : ''}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <SearchEmpty text="没有找到相关歌手" />
          )
        ) : null}

        {tab === 'album' ? (
          albums.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {albums.map((album) => (
                <li key={album.id}>
                  <Link href={`/album/${album.id}`} className="group block">
                    <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                      {album.picUrl ? (
                        <Image
                          unoptimized
                          src={getImageUrl(album.picUrl, 240) || album.picUrl}
                          alt={album.name}
                          width={200}
                          height={200}
                          className="size-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : null}
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm">{album.name}</p>
                    {album.artist?.name ? (
                      <p className="text-xs text-muted-foreground">
                        {album.artist.name}
                      </p>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <SearchEmpty text="没有找到相关专辑" />
          )
        ) : null}

        {tab === 'lyric' ? (
          lyricLoading ? (
            <SkeletonSongs count={8} />
          ) : (
            <SongRows
              songs={(lyricResult?.songs as LooseSong[]) ?? []}
              onPlay={(song, index) =>
                playAt((lyricResult?.songs as LooseSong[]) ?? [], index)
              }
            />
          )
        ) : null}

        {tab === 'user' ? (
          userLoading ? (
            <SkeletonSongs count={6} />
          ) : (
              userResult as {
                userprofiles?: {
                  userId: number;
                  nickname: string;
                  avatarUrl?: string;
                }[];
              }
            )?.userprofiles?.length ? (
            <ul className="grid gap-3 sm:grid-cols-2">
              {(
                userResult as {
                  userprofiles: {
                    userId: number;
                    nickname: string;
                    avatarUrl?: string;
                  }[];
                }
              ).userprofiles.map((user) => (
                <li
                  key={user.userId}
                  className="flex items-center gap-3 rounded-xl border border-border/60 p-3"
                >
                  <SearchUserAvatar user={user} />
                  <p className="truncate font-medium">{user.nickname}</p>
                </li>
              ))}
            </ul>
          ) : (
            <SearchEmpty text="没有找到相关用户" />
          )
        ) : null}

        {tab === 'voice' || tab === 'podcast' ? (
          <SearchEmpty text="该分类接口暂未接入，敬请期待" />
        ) : null}
      </div>
    </section>
  );
};

function SearchArtistAvatar({ artist }: { artist: CloudSearchArtist }) {
  const src =
    getImageUrl(artist.picUrl || artist.img1v1Url, 120) ||
    artist.picUrl ||
    artist.img1v1Url;
  return (
    <div className="size-14 shrink-0 overflow-hidden rounded-full bg-muted">
      {src ? (
        <Image
          unoptimized
          src={src}
          alt={artist.name}
          width={56}
          height={56}
          className="size-full object-cover"
        />
      ) : null}
    </div>
  );
}

function SearchUserAvatar({
  user
}: {
  user: { nickname: string; avatarUrl?: string };
}) {
  return (
    <div className="size-12 shrink-0 overflow-hidden rounded-full bg-muted">
      {user.avatarUrl ? (
        <Image
          unoptimized
          src={user.avatarUrl}
          alt={user.nickname}
          width={48}
          height={48}
          className="size-full object-cover"
        />
      ) : null}
    </div>
  );
}
