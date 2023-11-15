'use server';
import { createApiUrl } from './createApiUrl';

import { fetchData } from './fetchData';

export const getPlayListSongs = (id: number): Promise<PlaylistSong> => {
  const url = createApiUrl('/playlist/track/all', {
    id,
    limit: 30,
    offset: 0,
    timestamp: Date.now(),
  });
  return fetchData(url);
};

/**
 * Retrieves the hot playlist.
 *
 * @return {Promise<IPlaylist>} A promise that resolves to the hot playlist.
 */
export async function getHotPlayList(): Promise<IPlaylist> {
  const url = createApiUrl('/top/playlist');
  return await fetchData(url);
}

export async function getPlayListDetail(id: number): Promise<IPlaylist> {
  const url = createApiUrl('/playlist/detail', { id });
  return await fetchData(url);
}
