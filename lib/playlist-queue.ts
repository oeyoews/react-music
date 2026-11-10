import type { QueueSong } from '~lib/store';

type LooseSong = {
  id: number;
  name: string;
  ar?: { name?: string }[];
  artists?: { name?: string }[];
  al?: { picUrl?: string };
  album?: { picUrl?: string };
};

/** 把歌曲详情或搜索结果收成底栏队列里的一首。 */
export function toQueueSong(
  song: LooseSong,
  fallbackCover?: string
): QueueSong {
  const artist =
    song.ar
      ?.map((item) => item.name)
      .filter(Boolean)
      .join(' / ') ||
    song.artists
      ?.map((item) => item.name)
      .filter(Boolean)
      .join(' / ');

  return {
    id: song.id,
    name: song.name,
    artist: artist || undefined,
    cover: song.al?.picUrl || song.album?.picUrl || fallbackCover
  };
}

export function songIdFromPath(href?: string) {
  if (!href || href.startsWith('http')) return undefined;
  const [path, query] = href.split('?');
  if (path !== '/song') return undefined;
  const id = Number(new URLSearchParams(query ?? '').get('id'));
  return Number.isFinite(id) && id > 0 ? id : undefined;
}

type PlayableTrack = {
  id: number;
  name: string;
  ar?: Ar[];
  dt?: number;
  al?: { picUrl?: string };
};

/**
 * 将歌单曲目转为底栏播放队列结构。
 */
export function tracksToQueue(
  tracks: PlayableTrack[],
  fallbackCover?: string
): QueueSong[] {
  return tracks
    .filter((t) => t?.id && t.name)
    .map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.ar?.map((a) => a.name).join(' / '),
      cover: track.al?.picUrl ?? fallbackCover,
      duration: track.dt
    }));
}
