'use server';

import { customfetch as fetch } from '~lib/fetchData';

/**
 * Retrieves the songs of a playlist.
 *
 * @param {number} id The id of the playlist.
 * @return {Promise<PlaylistSong>} A promise that resolves to the songs of the playlist.
 */
export const getPlayListSongs = async (id: Id): Promise<PlaylistSong> => {
  return await fetch({
    url: '/playlist/track/all',
    params: {
      id,
      limit: 30,
      offset: 0,
    },
  });
};

/**
 * Retrieves the hot playlist.
 *
 * @return {Promise<IPlaylist>} A promise that resolves to the hot playlist.
 */
export const getTopPlayList = async (): Promise<IPlaylist> => {
  return await fetch({
    url: '/top/playlist',
  });
};

export const getPlayListPersonalized = async (
  cookie: string, // 可选
): Promise<IPlaylistPersonalized> => {
  return await fetch({
    url: '/personalized',
    params: {
      limit: 12,
      cookie,
    },
  });
};

export const getPlayListDetail = async (
  id: number,
): Promise<IPlayListDetails> => {
  return await fetch({
    url: '/playlist/detail',
    params: { id },
  });
};

export const getPlayListComment = async (id: Id): Promise<ISongComment> => {
  return await fetch({
    url: '/comment/playlist',
    params: { id },
  });
};

export const getAlbumComment = async (id: Id): Promise<ISongComment> => {
  return await fetch({
    url: '/comment/album',
    params: { id },
  });
};

export const getUserPlayList = async (uid: Id): Promise<IPlaylist> => {
  return await fetch({
    url: '/user/playlist',
    params: { uid },
  });
};
