'use server';

import { fetchData as fetch } from '~lib/fetchData';

export const getPlayListSongs = async (id: number): Promise<PlaylistSong> => {
  return await fetch({
    url: '/playlist/track/all',
    params: {
      id,
      limit: 30,
      offset: 0,
      timestamp: Date.now(),
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
