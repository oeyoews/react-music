// 'use server';

import { fetchData as fetch } from './fetchData';

export const checkSong = async (
  id: number,
): Promise<{
  code: number;
  success: boolean;
  message: string;
}> => {
  return await fetch({
    url: '/check/music',
    params: { id },
  });
};

/**
 * Retrieves a list of recommended songs.
 *
 * @return {Promise<IRecommendSongs>} A promise that resolves to an object containing recommended songs.
 */
export async function getRecommendations(): Promise<IRecommendSongs> {
  // need login
  return await fetch({
    url: '/recommend/songs',
  });
}

/**
 * Retrieves the banners from the server.
 *
 * @return {Promise<IBanner>} A promise that resolves with the banners.
 */
export async function getBanners(): Promise<IBanner> {
  return await fetch({
    url: '/banner',
    params: {
      type: 0,
    },
    options: {
      next: {
        revalidate: 3600 * 24,
      },
    },
  });
}

export async function searchHot(): Promise<IHotDetail> {
  return await fetch({
    url: '/search/hot/detail',
  });
}

//  v1 有时会失效
export async function getMusicURL(
  id: number,
  // level: any = 'standard',
): Promise<MusicURL> {
  return fetch({
    url: '/song/url',
    params: {
      id,
      // level,
    },
  });
}

export async function getSongDetail(ids: number): Promise<ISongDetail> {
  return await fetch({
    url: '/song/detail',
    params: {
      ids,
    },
  });
}

// export async function getSongComment(id: number): Promise<any> {
//   return await fetch({
//     url: '/comment/music',
//     params: {
//       id,
//     },
//   });
// }
