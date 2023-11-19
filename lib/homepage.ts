import { customfetch } from './fetchData';

export const getHomePage = async (): Promise<IHomePage> => {
  return await customfetch({
    url: '/homepage/dragon/ball',
  });
};
