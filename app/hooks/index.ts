import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import { getUserDetail } from '~lib/login';
import {
  getStarPick,
  getSongDetail,
  getArtistDetail,
  getSimiSong,
  getMusicURL,
} from '~lib/search';

export const useUserData = (uid: number) => {
  const { data: userData } = useSWRImmutable(
    uid + 'user',
    () => getUserDetail(uid),
    { suspense: true },
  );
  return userData;
};

export const useStarPick = () => {
  const { data: starPickData } = useSWR(
    'starpick',
    () => getStarPick(localStorage.cookie),
    { suspense: true },
  );
  return { comments: starPickData?.data.blocks[0] };
};

export const useMusicURL = (id: Id) => {
  const { data: musicURLData } = useSWR(
    id + 'url',
    () => getMusicURL(id, localStorage.cookie),
    {
      suspense: true,
      refreshInterval: 3600000,
    },
  );
  return musicURLData.data?.[0];
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
