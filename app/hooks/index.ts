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

import { getMVComment } from '~lib/mv';
import { useEffect } from 'react';

export const useMvComment = (id: Id) => {
  const data = useSWRImmutable(id + 'mvcomment', () => getMVComment(id), {
    suspense: true,
  });
  if (data.data.code !== 200) {
    toast.error(`评论区: ${data.data.message}` as string);
  }
  return data;
};

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
  return useSWRImmutable(id + 'comment', () => getSongComment(id), {});
};

export const useUserData = (uid: number) => {
  return useSWRImmutable([uid], getUserDetail);
};

export const useStarPick = () => {
  return useSWRImmutable('starpick', () => getStarPick(localStorage.cookie), {
    // suspense: true,
    refreshInterval: 3600000,
  });
};

export const useMusicURL = (id: Id) => {
  // [id, localStorage.cookie]
  // TODO: 为什么不能直接传
  return useSWR(
    [id, localStorage.cookie],
    () => getMusicURL(id, localStorage.cookie),
    {
      suspense: true,
      refreshInterval: 3600000,
    },
  );
};

export const useSongDetailData = (slug: Id) => {
  return useSWRImmutable(slug + 'detail', () => getSongDetail(slug), {
    refreshInterval: 3600000,
  });
};

// TODO: https://swr.vercel.app/zh-CN/docs/with-nextjs.zh-CN#server-components
export const useArtistData = (arId: number) => {
  const artistData = useSWRImmutable(
    arId + 'artist',
    () => getArtistDetail(arId),
    {
      // suspense: true, // 必须???
      refreshInterval: 3600000,
    },
  );
  return artistData;
};

export const useSiMiSong = (slug: Id) => {
  return useSWRImmutable(slug + 'simi', () => getSimiSong(slug), {
    refreshInterval: 3600000,
  });
};
