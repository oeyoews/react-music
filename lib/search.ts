'use server';

// NOTE: 注意这里必须要明确指定use server, 这里的代码依赖node, 所以必须跑在server上面, 对于服务端渲染 @NeteaseMusicApi

import { customfetch as fetch } from './fetchData';
import app from 'NeteaseCloudMusicApi';

// id: 歌手id
export const getArtistDetail = async (arId: Id) => {
  return await app.artist_detail({
    id: arId,
  });
};

export const getSimiSong = async (id: number) => {
  return await app.simi_song({
    id,
  });
};

export const getLyric = async (id: Id) => {
  return await app.lyric({
    id,
  });
};

// TODO: br
export const checkSong = async (id: Id, cookie: string) => {
  return await app.check_music({
    id,
    cookie,
    br: 999000,
  });
};

// offset 分页
export const search = async (
  keywords: string,
  types?: SearchTypes,
  offset?: number,
) => {
  return await app.search({
    keywords,
  });
};

export const searchDefault = async () => {
  return await app.search_default({});
};

// TODO
export const searchCloud = async (keywords: string) => {
  return await app.cloudsearch({
    keywords,
  });
};

export const searchSuggest = async (keywords: string) => {
  return await app.search_suggest({
    keywords,
  });
};

export const getRecommendations = async (cookie: string) => {
  // NOTE: need login
  return await app.recommend_songs({
    cookie: cookie,
  });
};

export const getBanners = async () => {
  return await app.banner({
    type: 1,
  });
};

// TODO:
export const searchHot = async (): Promise<any> => {
  return await app.search_hot({});
};

export const searchHotDetail = async () => {
  return await app.search_hot_detail({});
};

// 播放地址有效期 25 min
export const getMusicURL = async (id: Id, cookie?: string) => {
  return await app.song_url({
    id,
    cookie,
  });
};

export const getSongDetail = async (ids: string) => {
  return await app.song_detail({
    ids,
  });
};

export const getAlbumDetail = async (id: Id) => {
  return await app.album({
    id,
  });
};

export const getSongComment = async (id: number) => {
  return await app.comment_music({
    id,
  });
};

// NOTE: 需要cookie(游客cookie 也可以); 有时没有cookie 也可以???
export const getStarPick = async (cookie: string): Promise<IStarPick> => {
  // @ts-ignore
  return await app.starpick_comments_summary();
};

export const getDownloadURL = async (id: Id): Promise<any> => {
  return await app.song_download_url({
    id,
  });
};
