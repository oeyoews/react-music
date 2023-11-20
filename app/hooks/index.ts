import useSWRImmutable from 'swr/immutable';
import { getSongDetail, getArtistDetail } from '~lib/search';

export const useSongDetailData = (slug: Id) => {
  const { data: songDetailData, isLoading: isLoadingSongDetail } =
    useSWRImmutable(slug + 'detail', () => getSongDetail(slug), {
      suspense: true,
      refreshInterval: 3600000,
    });
  return songDetailData;
};

export const useArtistData = (id: number, slug: Id) => {
  const songDetailData = useSongDetailData(slug);
  const { data: artistDetailData } = useSWRImmutable(
    songDetailData?.songs[0].id ? `${slug}-artist` : null,
    () => getArtistDetail(id),
    {
      suspense: true,
      refreshInterval: 3600000,
    },
  );
  return artistDetailData;
};
