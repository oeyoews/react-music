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

export const useLyric = (id: Id) => {
  return useSWRImmutable(id + 'lyric', () => getLyric(id), {
    suspense: true,
  });
};

export const useSearch = (keyword: string) => {
  const searchKeyword = encodeURIComponent(keyword.trim());
  return useSWRImmutable(keyword + 'search', () => search(searchKeyword), {
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
  const { data: userData, isLoading } = useSWRImmutable(
    uid + 'user',
    () => getUserDetail(uid),
    {
      suspense: true,
      refreshInterval: 3600000,
      revalidateOnMount: false,
    },
  );
  return { userData, isLoading };
};

export const useStarPick = () => {
  const { data: starPickData } = useSWR(
    'starpick',
    () => getStarPick(localStorage.cookie),
    { suspense: true },
  );
  return { comments: starPickData?.data.blocks[0].creatives };
};

export const useMusicURL = (id: Id) => {
  const { data, isLoading } = useSWR(
    id + 'url',
    () => getMusicURL(id, localStorage.cookie),
    {
      suspense: true,
      refreshInterval: 3600000,
    },
  );
  return { url: data.data?.[0].url, isLoading };
};

export const useSongDetailData = (slug: Id) => {
  const { data: songDetailData } = useSWRImmutable(
    slug + 'detail',
    () => getSongDetail(slug),
    {
      suspense: true,
      refreshInterval: 3600000,
      revalidateOnFocus: false,
    },
  );
  return songDetailData;
};

export const useArtistData = (slug: string) => {
  const songDetailData = useSongDetailData(slug);
  return useSWRImmutable(
    `${slug}-artist`,
    () => getArtistDetail(songDetailData.songs[0].ar[0].id),
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
