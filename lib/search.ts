import { createApiUrl } from './createApiUrl';
import { fetchData } from './fetchData';

/**
 * Retrieves a list of recommended songs.
 *
 * @return {Promise<IRecommendSongs>} A promise that resolves to an object containing recommended songs.
 */
export async function getRecommendations(): Promise<IRecommendSongs> {
  // need login
  const url = createApiUrl('/recommend/songs');
  return await fetchData(url);
}

/**
 * Retrieves the hot playlist.
 *
 * @return {Promise<IPlaylist>} A promise that resolves to the hot playlist.
 */
export async function getHotPlayList(): Promise<IPlaylist> {
  const url = createApiUrl('/top/playlist');
  return await fetchData(url);
}

/**
 * Retrieves the banners from the server.
 *
 * @return {Promise<IBanner>} A promise that resolves with the banners.
 */
export async function getBanners(): Promise<IBanner> {
  const url = createApiUrl('/banner', { type: 0 });
  return await fetchData(url);
}

export async function searchHot(): Promise<IHotDetail> {
  const url = createApiUrl('/search/hot/detail');
  return await fetchData(url);
}

export async function getPlayListDetail(id: number): Promise<IPlaylist> {
  const url = createApiUrl('/playlist/detail', { id });
  return await fetchData(url);
}

//  v1 有时会失效
export async function getMusicURL(
  id: number,
  // level: any = 'standard',
): Promise<MusicURL> {
  const url = createApiUrl('/song/url', { id });
  return await fetchData(url);
}

export async function getSongDetail(ids: number): Promise<ISongDetail> {
  const url = createApiUrl('/song/detail', { ids });
  return await fetchData(url);
}
