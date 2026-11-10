'use server';

import { create } from '~lib/fetchData';
import {
  buildPlaylistDetail,
  type PlaylistDetailData
} from '~lib/playlist-view';

const fetch = create();

/** 带登录 cookie 时走 POST，并用 timestamp 避开本地 API 对匿名结果的缓存。 */
function withCookie(cookie?: string): RequestInit | undefined {
  const value = cookie?.trim();
  if (!value) return undefined;
  return {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({ cookie: value }),
    next: { revalidate: 0 }
  };
}

function authedParams<T extends Record<string, string | number | boolean>>(
  params: T,
  cookie?: string
) {
  if (!cookie?.trim()) return params;
  return { ...params, timestamp: Date.now() };
}

/**
 * Retrieves the songs of a playlist.
 *
 * @param {number} id The id of the playlist.
 * @return {Promise<PlaylistSong>} A promise that resolves to the songs of the playlist.
 */
export const getPlayListSongs = async (
  id: Id,
  limit = 30,
  offset = 0,
  cookie?: string
): Promise<PlaylistSong> => {
  return await fetch({
    url: '/playlist/track/all',
    params: authedParams({ id, limit, offset }, cookie),
    options: withCookie(cookie)
  });
};

/**
 * Retrieves the hot playlist.
 *
 * @return {Promise<IPlaylist>} A promise that resolves to the hot playlist.
 */
export const getHotPlayList = async (): Promise<IPlaylist> => {
  return await fetch({
    url: '/top/playlist'
  });
};

export const getPlayListPersonalized = async (
  cookie: string // 可选
): Promise<IPlaylistPersonalized> => {
  return await fetch({
    url: '/personalized',
    params: {
      limit: 12
    },
    options: {
      method: 'POST',
      body: JSON.stringify({ cookie })
    }
  });
};

export const getPlayListDetail = async (
  id: number,
  cookie?: string
): Promise<IPlayListDetails> => {
  return await fetch({
    url: '/playlist/detail',
    params: authedParams({ id }, cookie),
    options: withCookie(cookie)
  });
};

export const getPlayListComment = async (id: Id): Promise<ISongComment> => {
  return await fetch({
    url: '/comment/playlist',
    params: { id }
  });
};

export const getAlbumComment = async (id: Id): Promise<ISongComment> => {
  return await fetch({
    url: '/comment/album',
    params: { id }
  });
};

export const getUserPlayList = async (
  uid: Id,
  cookie?: string
): Promise<IPlaylist | null> => {
  const data = (await fetch({
    url: '/user/playlist',
    params: authedParams({ uid, limit: 100, offset: 0 }, cookie),
    options: withCookie(cookie)
  })) as {
    playlist?: Playlist[];
    playlists?: Playlist[];
    code?: number;
    more?: boolean;
  } | null;

  if (!data) return null;
  const playlists = data.playlist ?? data.playlists ?? [];
  return {
    playlists,
    code: data.code ?? 200,
    more: Boolean(data.more),
    total: playlists.length,
    cat: ''
  };
};

/** 歌单页数据。传入登录 cookie 后可以读到隐私歌单，例如「我喜欢的音乐」。 */
export const getPlaylistView = async (
  id: number,
  cookie?: string
): Promise<PlaylistDetailData | null> => {
  if (!Number.isFinite(id)) return null;
  const musicdata = await getPlayListDetail(id, cookie);
  if (!musicdata?.playlist) return null;
  const fetchLimit = Math.min(
    Math.max(musicdata.playlist.trackCount || 1, 1),
    500
  );
  const [allTracksData, playListComment, subscribersData] = await Promise.all([
    getPlayListSongs(id, fetchLimit, 0, cookie),
    getPlayListComment(id),
    getPlaylistSubscribers(id)
  ]);
  return buildPlaylistDetail({
    musicdata,
    allTracksData,
    playListComment,
    subscribersData
  });
};

/** 歌单收藏者。失败时返回 null，页面回退到详情里的预览列表。 */
export const getPlaylistSubscribers = async (id: Id, limit = 30) => {
  return (await fetch({
    url: '/playlist/subscribers',
    params: { id, limit, offset: 0 }
  })) as {
    subscribers?: Creator[];
    total?: number;
  } | null;
};
