// 'use server';

import { create } from './fetchData';
const fetch = create(process.env.NEXT_PUBLIC_MUSIC_API as string);

export const getLyric = async (id: number): Promise<ILyric> => {
  return await fetch({
    url: '/lyric',
    params: {
      id,
    },
  });
};

export const checkSong = async (id: number): Promise<CheckSong> => {
  return await fetch({
    url: '/check/music',
  });
};

export const search = async (keywords: string): Promise<ISearch> => {
  return await fetch({
    url: '/search/suggest',
    params: {
      keywords,
    },
  });
};

/**
 * Retrieves a list of recommended songs.
 *
 * @return {Promise<IRecommendSongs>} A promise that resolves to an object containing recommended songs.
 */
export const getRecommendations = async (): Promise<IRecommendSongs> => {
  // need login
  return await fetch({
    url: '/recommend/songs',
  });
};

/**
 * Retrieves the banners from the server.
 *
 * @return {Promise<IBanner>} A promise that resolves with the banners.
 */
export const getBanners = async (): Promise<IBanner> => {
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
};

export const searchHot = async (): Promise<IHotDetail> => {
  return await fetch({
    url: '/search/hot/detail',
  });
};

//  v1 有时会失效
export const getMusicURL = async (
  id: number,
  // level: any = 'standard',
): Promise<IMusicURL> => {
  return fetch({
    url: '/song/url',
    params: {
      id,
      // level,
    },
  });
};

export const getSongDetail = async (ids: number): Promise<ISongDetail> => {
  return await fetch({
    url: '/song/detail',
    params: {
      ids,
    },
  });
};

export const getAlbumDetail = async (id: number): Promise<IAlbumDetail> => {
  return await fetch({
    url: '/album',
    params: {
      id,
    },
  });
};
// export async function getSongComment(id: number): Promise<any> {
//   return await fetch({
//     url: '/comment/music',
//     params: {
//       id,
//     },
//   });
// }
