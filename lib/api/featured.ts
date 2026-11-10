'use server';

import { create } from '~lib/fetchData';
import { getHomepageBlocks } from '~lib/api/homepage';
import { normalizeHomepageBlocks } from '~lib/homepage-block';

const fetch = create();

export type FeaturedPlaylist = {
  id: string;
  title: string;
  description: string;
  image?: string;
  playCount?: number;
  href: string;
};

export type FeaturedSong = {
  id: number;
  name: string;
  artist: string;
  cover?: string;
  duration?: number;
  sq: boolean;
};

type HqPlaylist = {
  id?: number;
  name?: string;
  coverImgUrl?: string;
  playCount?: number;
  copywriter?: string;
};

function splitTitle(name: string, extra?: string) {
  const [head, ...rest] = name.split(/\s*[|｜]\s*/);
  const title = head?.trim() || name;
  const description = rest.join(' | ').trim() || extra?.trim() || '';
  return { title, description };
}

export async function getFeaturedPlaylists(): Promise<FeaturedPlaylist[]> {
  const blocks = normalizeHomepageBlocks(await getHomepageBlocks());
  const official = blocks.find(
    (block) => block.key === 'HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST'
  );

  const fromHome = (official?.items ?? [])
    .filter((item) => item.title && (item.href || item.id))
    .slice(0, 6)
    .map((item) => {
      const copy = splitTitle(item.title, item.desc);
      return {
        id: item.id,
        title: copy.title,
        description: copy.description,
        image: item.image,
        playCount: item.playCount,
        href: item.href || `/playlist/${item.id}`
      };
    });

  if (fromHome.length > 0) return fromHome;

  const data = (await fetch({
    url: '/top/playlist/highquality',
    params: { limit: 6 }
  })) as { playlists?: HqPlaylist[] } | null;

  return (data?.playlists ?? [])
    .filter((playlist) => playlist.id && playlist.name)
    .slice(0, 6)
    .map((playlist) => {
      const copy = splitTitle(playlist.name || '', playlist.copywriter);
      return {
        id: String(playlist.id),
        title: copy.title,
        description: copy.description,
        image: playlist.coverImgUrl,
        playCount: playlist.playCount,
        href: `/playlist/${playlist.id}`
      };
    });
}

type NewSong = {
  id?: number;
  name?: string;
  duration?: number;
  artists?: { name?: string }[];
  album?: { picUrl?: string };
  privilege?: { maxbr?: number };
};

export async function getNewSongs(limit = 12): Promise<FeaturedSong[]> {
  const data = (await fetch({
    url: '/top/song',
    params: { type: 0 }
  })) as { data?: NewSong[] } | null;

  return (data?.data ?? [])
    .filter((song) => song.id && song.name)
    .slice(0, limit)
    .map((song) => ({
      id: song.id as number,
      name: song.name as string,
      artist:
        song.artists
          ?.map((artist) => artist.name)
          .filter(Boolean)
          .join(' / ') || '',
      cover: song.album?.picUrl,
      duration: song.duration,
      sq: (song.privilege?.maxbr ?? 0) >= 999000
    }));
}
