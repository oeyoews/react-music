import { customfetch as fetch } from './fetchData';

// id: 歌手 id
export const getArtistDetail = async (id: Id): Promise<IArtistDetail> => {
  const warn = {
    message: '缺少歌手 id',
    code: 400,
  };
  // TODO
  if (!id) {
    // console.warn(warn.message);
    // @ts-ignore
    return warn;
  }
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

export const checkSong = async (
  id: Id,
  cookie?: string,
): Promise<CheckSong> => {
  return await fetch({
    url: '/check/music',
    params: {
      id,
    },
    options: {
      method: 'POST',
      body: JSON.stringify({ cookie }),
    },
  });
};
// offset 分页
export const multiSearch = async (keywords: string): Promise<ISearch> => {
  return await fetch({
    url: '/search/multimatch',
    params: {
      keywords,
    },
  });
};

// offset 分页
export const search = async (keywords: string): Promise<ISearch> => {
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
    params: {},
    options: {
      method: 'POST',
      body: JSON.stringify({ cookie }),
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
      type: 0, // TODO: 1 will cause motiondiv error ???
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

// 播放地址有效期 25 min
export const getMusicURL = async (
  id: Id,
  cookie?: string,
  // level: any = 'standard',
): Promise<IMusicURL> => {
  return fetch({
    url: '/song/url',
    params: {
      id,
    },
    options: {
      method: 'POST',
      body: JSON.stringify({ cookie }),
    },
  });
};

export const getSongDetail = async (ids: Id): Promise<ISongDetail> => {
  if (!ids) console.warn('请传入歌曲 id');
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
      limit: 30,
    },
  });
};

// NOTE: 需要 cookie(游客 cookie 也可以); 有时没有 cookie 也可以？??
export const getStarPick = async (cookie: string): Promise<IStarPick> => {
  return await fetch({
    url: '/starpick/comments/summary',
    options: {
      method: 'POST',
      body: JSON.stringify({ cookie }),
    },
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
