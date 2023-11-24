import { customfetch as fetch } from './fetchData';
import app from 'NeteaseCloudMusicApi';

export const getSiMiMV = async (mvid: Id): Promise<IArtistMV> => {
  return await fetch({
    url: '/simi/mv',
    params: { mvid },
  });
};

export const getArtistMV = async (arId: Id) => {
  return await app.artist_mv({
    id: arId,
  });
  // return await fetch({
  //   url: '/artist/mv',
  //   params: { id: arId },
  // });
};

export const getMvFirst = async () => {
  return (await app.mv_first({
    limit: 30,
  })) as unknown as { status: number; body: IMvFirst };
};

export const getMvRCMD = async (limit: number = 24) => {
  return (await app.mv_exclusive_rcmd({
    limit,
  })) as unknown as {
    status: number;
    body: IMvFirst;
  };
};

export const getMvPersonalized = async (): Promise<IMvFirst> => {
  return await fetch({
    url: `/personalized/mv`,
  });
};

// NOTE: 需要加上cookie ???
export const getMvURL = async (id: Id, cookie?: string) => {
  return (await app.mv_url({
    id,
    cookie,
    r: 1080,
  })) as unknown as { status: number; body: IMvURL };
};

export const getPersonalizedMv = async (): Promise<IPersonalizedMv> => {
  return await fetch({
    url: '/personalized/mv',
  });
};

export const getMVComment = async (id: Id) => {
  return (await app.comment_mv({
    id,
    limit: 99,
  })) as unknown as { status: number; body: ISongComment };
};

// TODO: video
export const getPersonalizedVideo = async (): Promise<any> => {
  return await fetch({
    url: '/video/timeline/recommend',
  });
};
