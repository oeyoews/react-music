import { customfetch } from './fetchData';

export const getMvFirst = async (): Promise<IMvFirst> => {
  return await customfetch({
    url: '/mv/first',
  });
};
