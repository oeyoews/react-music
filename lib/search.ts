// 'use server';

import { createApiUrl } from './createApiUrl';
import { fetchData } from './fetchData';

export const checkSong = async (
  id: number,
): Promise<{
  code: number;
  success: boolean;
  message: string;
}> => {
  const url = createApiUrl('/check/music', { id });
  return await fetchData(url);
};

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
 * Retrieves the banners from the server.
 *
 * @return {Promise<IBanner>} A promise that resolves with the banners.
 */
export async function getBanners(): Promise<IBanner> {
  const url = createApiUrl('/banner', { type: 0 });
  return await fetchData(url, {
    // cache: {re}
    next: {
      // one dary
      revalidate: 3600 * 24,
    },
  });
}

export async function searchHot(): Promise<IHotDetail> {
  const url = createApiUrl('/search/hot/detail');
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

// export async function getSongDetail(id: number): {
//   const url = createApiUrl('/comment/music', { id });
//   return await fetchData(url);
// }
