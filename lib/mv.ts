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
