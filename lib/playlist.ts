'use server';

import { create } from '~lib/fetchData';

const fetch = create(process.env.NEXT_PUBLIC_MUSIC_API as string);

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
export const getHotPlayList = async (): Promise<IPlaylist> => {
  return await fetch({
    url: '/top/playlist',
  });
};

export const getPlayListDetail = async (id: number): Promise<IPlaylist> => {
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
