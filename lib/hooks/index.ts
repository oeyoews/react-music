import useSWRImmutable from 'swr/immutable';
import { getUserDetail } from '~lib/login';
import {
  getSongComment,
  getSongDetail,
  getSimiSong,
  getStarPick,
  getArtistDetail,
  getMusicURL,
  search,
  getLyric,
} from '~lib/search';

import { getMVComment, getArtistMV, getSiMiMV, getMvDetail } from '~lib/mv';
import { getPlayListPersonalized } from '~lib/api/playlist';

export const useSiMiMV = (mvId: Id) => {
  return useSWRImmutable(mvId + 'simimv', () => getSiMiMV(mvId));
};

export const useArtistMV = (arId: Id) => {
  return useSWRImmutable(arId + 'artistmv', () => getArtistMV(arId));
};

export const usePlaylistPersonalized = () => {
  return useSWRImmutable('playlistpersonalized', () =>
    getPlayListPersonalized(localStorage.cookie),
  );
};

export const useMvComment = (id: Id) => {
  const data = useSWRImmutable(id + 'mvcomment', () => getMVComment(id), {});
  return data;
};

export const useMvDetail = (id: Id) => {
  const data = useSWRImmutable(id + 'mvdetail', () => getMvDetail(id), {});
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
  return useSWRImmutable(id + 'songcomment', () => getSongComment(id), {
    suspense: true,
  });
};

export const useUserData = (uid: number) => {
  return useSWRImmutable([uid], () => getUserDetail(uid));
};

export const useStarPick = () => {
  return useSWRImmutable('starpick', () => getStarPick(localStorage.cookie), {
    // suspense: true,
    refreshInterval: 3600000,
  });
};

// 为什么有时候会为空
export const useMusicURL = (id: Id) => {
  return useSWRImmutable(
    [id, localStorage.cookie],
    ([id]) => getMusicURL(id, localStorage.cookie),
    {
      suspense: false,
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
export const useArtistData = (arId: Id) => {
  return useSWRImmutable(arId + 'artist', () => getArtistDetail(arId));
};

export const useSiMiSong = (slug: Id) => {
  return useSWRImmutable(slug + 'simi', () => getSimiSong(slug), {
    refreshInterval: 3600000,
  });
};
