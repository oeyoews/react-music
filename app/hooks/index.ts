import { useEffect } from 'react';
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
} from '~lib/search';

export const useSongComment = (id: Id) => {
  const { data, isLoading } = useSWRImmutable(
    id + 'comment',
    () => getSongComment(id),
    {
      suspense: true,
      refreshInterval: 3600000,
    },
  );

  return { data, isLoading };
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
  const { data: artistDetailData } = useSWRImmutable(
    `${slug}-artist`,
    () => getArtistDetail(songDetailData.songs[0].ar[0].id),
    {
      suspense: true,
      refreshInterval: 3600000,
    },
  );
  return artistDetailData.data;
};

export const useSiMiSong = (slug: Id) => {
  const { data: simiSongData } = useSWRImmutable(
    slug + 'simi',
    () => getSimiSong(slug),
    {
      suspense: true,
      refreshInterval: 3600000,
    },
  );
  return simiSongData.songs;
};
