import { customfetch as fetch } from './fetchData';

export const getMvFirst = async (): Promise<IMvFirst> => {
  return await fetch({
    url: '/mv/first',
  });
};

export const getMvRCMD = async (limit: number = 24): Promise<IMvFirst> => {
  return await fetch({
    url: `/mv/exclusive/rcmd`,
    params: {
      limit,
    },
  });
};

export const getMvPersonalized = async (): Promise<IMvFirst> => {
  return await fetch({
    url: `/personalized/mv`,
  });
};

// NOTE: 需要加上cookie ???
export const getMvURL = async (id: Id, cookie?: string): Promise<IMvURL> => {
  return await fetch({
    url: '/mv/url',
    params: { id, cookie },
  });
};

export const getPersonalizedMv = async (): Promise<IPersonalizedMv> => {
  return await fetch({
    url: '/personalized/mv',
  });
};

export const getMvDetail = async (mvid: Id): Promise<IMvDetail> => {
  return await fetch({
    url: '/mv/detail',
    params: { mvid },
  });
};

export const getMVComment = async (id: Id): Promise<ISongComment> => {
  return await fetch({
    url: '/comment/mv',
    params: { id, limit: 99 },
  });
};

// TODO: video
export const getPersonalizedVideo = async (): Promise<any> => {
  return await fetch({
    url: '/video/timeline/recommend',
  });
};
