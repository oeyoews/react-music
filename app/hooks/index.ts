import toast from 'react-hot-toast';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import { getUserDetail } from '~lib/login';
import {
  getSongComment,
  getStarPick,
  getSongDetail,
  getArtistDetail,
  getSimiSong,
  getMusicURL,
  search,
  getLyric,
} from '~lib/search';

// 不要使用id, 作为key, 因为一个页面如果使用id作为路由, 多个数据会错乱
export const useLyric = (id: Id) => {
  return useSWRImmutable(id + 'lyric', () => getLyric(id), {
    suspense: true,
  });
};

export const useSearch = (keyword: string) => {
  const searchKeyword = decodeURIComponent(keyword.trim());
  return useSWRImmutable([searchKeyword], search, {
    suspense: true,
  });
};

export const useSongComment = (id: Id) => {
  return useSWRImmutable(id + 'comment', () => getSongComment(id), {
    suspense: true,
    // refreshInterval: 3600000,
  });
};

export const useUserData = (uid: number) => {
  const { data: userData, isLoading } = useSWRImmutable([uid], getUserDetail, {
    suspense: true,
    refreshInterval: 3600000,
    revalidateOnMount: false,
  });
  return { userData, isLoading };
};

export const useStarPick = () => {
  return useSWRImmutable('starpick', () => getStarPick(localStorage.cookie), {
    suspense: true,
    refreshInterval: 3600000,
  });
};

export const useMusicURL = (id: Id) => {
  // [id, localStorage.cookie]
  // TODO: 为什么不能直接传
  const cookie = localStorage.cookie;
  return useSWR([id, cookie], () => getMusicURL(id, cookie), {
    suspense: true,
    refreshInterval: 3600000,
  });
};

export const useSongDetailData = (slug: Id) => {
  return useSWR(slug + 'detail', () => getSongDetail(slug), {
    suspense: true,
    refreshInterval: 3600000,
    revalidateOnFocus: false,
  });
};

// TODO: https://swr.vercel.app/zh-CN/docs/with-nextjs.zh-CN#server-components
export const useArtistData = (slug: string) => {
  // 依赖请求, 使用返回值作为key, 如果函数抛出错误或返回 falsy 值，SWR 会知道某些依赖还没准备好。
  const songDetailData = useSongDetailData(slug);
  if (songDetailData.data.code !== 200) {
    toast.error(songDetailData.data.message as string);
  }
  return useSWRImmutable(
    slug + 'artist',
    () => getArtistDetail(songDetailData.data.songs[0].ar[0].id),
    {
      suspense: true,
      refreshInterval: 3600000,
    },
  );
};

export const useSiMiSong = (slug: Id) => {
  return useSWRImmutable(slug + 'simi', () => getSimiSong(slug), {
    suspense: true,
    refreshInterval: 3600000,
  });
};
