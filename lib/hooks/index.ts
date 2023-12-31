import toast from 'react-hot-toast';
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
  getLyric
} from '~lib/search';

import { getMVComment, getArtistMV, getSiMiMV } from '~lib/mv';
import { getPlayListPersonalized } from '~lib/api/playlist';
import useSWR from 'swr';

export const useSiMiMV = (mvId: Id) => {
  return useSWRImmutable(mvId + 'simimv', () => getSiMiMV(mvId));
};

export const useArtistMV = (arId: Id) => {
  return useSWR(arId + 'artistmv', () => getArtistMV(arId));
};

export const usePlaylistPersonalized = () => {
  return useSWRImmutable('playlistpersonalized', () =>
    getPlayListPersonalized(localStorage.cookie)
  );
};

export const useMvComment = (id: Id) => {
  const data = useSWRImmutable(id + 'mvcomment', () => getMVComment(id), {});
  // 这里会导致hydration error
  // if (data.data?.code !== 200) {
  //   toast.error(`评论区: ${data.data?.message}` as string, {
  //     position: 'bottom-right',
  //   });
  // }
  return data;
};

// 不要使用id, 作为key, 因为一个页面如果使用id作为路由, 多个数据会错乱
export const useLyric = (id: Id) => {
  return useSWRImmutable(id + 'lyric', () => getLyric(id), {
    suspense: false
  });
};

export const useSearch = (keyword: string) => {
  return useSWR(keyword, () => search(keyword));
};

export const useSongComment = (id: Id) => {
  const data = useSWR(id + 'comment', () => getSongComment(id), {
    // suspense: true,
  });
  if (data.data?.code !== 200 && data.data?.message) {
    toast.error(`评论区: ${data.data?.message}` as string, {
      position: 'bottom-right'
    });
  }
  return data;
};

export const useUserData = (uid: number) => {
  return useSWRImmutable([uid], () => getUserDetail(uid));
};

export const useStarPick = () => {
  return useSWRImmutable('starpick', () => getStarPick(localStorage.cookie), {
    // suspense: true,
    refreshInterval: 3600000
  });
};

export const useMusicURL = (id: Id) => {
  // [id, localStorage.cookie]
  // TODO: 为什么不能直接传
  return useSWRImmutable(
    id + 'musicurl',
    () => getMusicURL(id, localStorage?.cookie || ''),
    {
      suspense: false, // NOTE: localStorage not suitable for suspense on server, so this prerender will error without no suspense
      revalidateOnFocus: false
    }
  );
};

export const useSongDetailData = (slug: Id) => {
  return useSWR(slug + 'detail', () => getSongDetail(slug), {
    refreshInterval: 3600000
  });
};

// TODO: https://swr.vercel.app/zh-CN/docs/with-nextjs.zh-CN#server-components
export const useArtistData = (arId: number) => {
  return useSWRImmutable(arId + 'artist', () => getArtistDetail(arId));
};

export const useSiMiSong = (slug: Id) => {
  return useSWRImmutable(slug + 'simi', () => getSimiSong(slug), {
    refreshInterval: 3600000
  });
};
