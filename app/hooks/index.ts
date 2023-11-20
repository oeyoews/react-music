import { useEffect } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import { getSongDetail, getArtistDetail, getSimiSong } from '~lib/search';

export const useSongDetailData = (slug: Id) => {
  const { data: songDetailData } = useSWRImmutable(
    slug + 'detail',
    () => getSongDetail(slug),
    {
      suspense: true,
      refreshInterval: 3600000,
    },
  );
  return songDetailData;
};

export const useArtistData = (arId: number, slug: string) => {
  const { data: artistDetailData } = useSWRImmutable(
    arId ? `${slug}-artist` : null,
    () => getArtistDetail(arId),
    {
      suspense: true,
      refreshInterval: 3600000,
    },
  );
  return artistDetailData;
};

export const useSiMiSong = (slug: Id) => {
  const { data: simiSongData } = useSWRImmutable(
    slug + 'simi',
    () => getSimiSong(slug),
    { suspense: true },
  );
  return simiSongData;
};
