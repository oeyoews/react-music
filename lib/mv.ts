import { customfetch } from './fetchData';

export const getMvFirst = async (): Promise<IMvFirst> => {
  return await customfetch({
    url: '/mv/first',
  });
};

export const getMvURL = async (id: Id): Promise<IMvURL> => {
  return await customfetch({
    url: '/mv/url',
    params: { id },
  });
};

export const getPersonalizedMv = async (): Promise<IPersonalizedMv> => {
  return await customfetch({
    url: '/personalized/mv',
  });
};

export const getMvDetail = async (mvid: Id): Promise<IMvDetail> => {
  return await customfetch({
    url: '/mv/detail',
    params: { mvid },
  });
};
