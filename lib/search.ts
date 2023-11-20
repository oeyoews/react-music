// 'use server';

import { customfetch as fetch } from './fetchData';

// id: 歌手id
export const getArtistDetail = async (id: Id): Promise<IArtistDetail> => {
  console.log(id);
  return await fetch({
    url: '/artist/detail',
    params: {
      id,
    },
  });
};

export const getSimiSong = async (id: Id): Promise<ISimiSong> => {
  return await fetch({
    url: '/simi/song',
    params: {
      id,
    },
  });
};

export const getLyric = async (id: Id): Promise<ILyric> => {
  return await fetch({
    url: '/lyric',
    params: {
      id,
    },
  });
};

export const checkSong = async (id: Id, cookie: string): Promise<CheckSong> => {
  return await fetch({
    url: '/check/music',
    params: {
      id,
      cookie,
    },
  });
};

// offset 分页
export const search = async (
  keywords: string,
  types?: SearchTypes,
  offset?: number,
): Promise<ISearch> => {
  return await fetch({
    url: '/search',
    params: {
      keywords,
    },
  });
};

export const searchDefault = async (): Promise<ISearchDefault> => {
  return await fetch({
    url: '/search/default',
  });
};

// TODO
export const searchCloud = async (keywords: string): Promise<ISearch> => {
  return await fetch({
    url: '/cloudsearch',
    params: {
      keywords,
    },
  });
};

export const searchSuggest = async (keywords: string): Promise<ISearch> => {
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
export const getRecommendations = async (
  cookie: string,
): Promise<IRecommendSongs> => {
  // NOTE: need login
  return await fetch({
    url: '/recommend/songs',
    params: {
      cookie,
      timestamp: Date.now(),
    },
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
        revalidate: 3600,
      },
    },
  });
};

// TODO:
export const searchHot = async (): Promise<any> => {
  return await fetch({
    url: '/search/hot',
  });
};

export const searchHotDetail = async (): Promise<IHotDetail> => {
  return await fetch({
    url: '/search/hot/detail',
  });
};

//  v1 有时会失效
// TODO:
export const getMusicURL = async (
  id: Id,
  cookie: string,
  // level: any = 'standard',
): Promise<IMusicURL> => {
  return fetch({
    url: '/song/url',
    params: {
      id,
      cookie,
      // level,
    },
  });
};

export const getSongDetail = async (ids: Id): Promise<ISongDetail> => {
  return await fetch({
    url: '/song/detail',
    params: {
      ids,
    },
  });
};

export const getAlbumDetail = async (id: Id): Promise<IAlbumDetail> => {
  return await fetch({
    url: '/album',
    params: {
      id,
    },
  });
};

export const getSongComment = async (id: Id): Promise<ISongComment> => {
  return await fetch({
    url: '/comment/music',
    params: {
      id,
      limit: 99,
      // timestamp: Date.now(),
    },
  });
};

// NOTE: 需要cookie(游客cookie 也可以)
export const getStarPick = async (cookie: string): Promise<IStarPick> => {
  return await fetch({
    url: '/starpick/comments/summary',
    params: { cookie },
  });
};

export const getDownloadURL = async (id: Id): Promise<any> => {
  return await fetch({
    url: '/song/download/url',
    params: {
      id,
    },
  });
};
