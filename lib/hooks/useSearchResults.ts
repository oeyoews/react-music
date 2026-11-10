import useSWR from 'swr';

import { searchCloudTyped } from '~lib/search';

export type SearchOverview = {
  songs: Song[];
  songCount: number;
  artists: CloudSearchArtist[];
  playlists: Playlist[];
  albums: Album[];
};

async function fetchSearchOverview(keyword: string): Promise<SearchOverview> {
  const [songsRes, artistsRes, playlistsRes, albumsRes] = await Promise.all([
    searchCloudTyped(keyword, 1, 30),
    searchCloudTyped(keyword, 100, 8),
    searchCloudTyped(keyword, 1000, 24),
    searchCloudTyped(keyword, 10, 24)
  ]);

  return {
    songs: songsRes?.result?.songs ?? [],
    songCount:
      songsRes?.result?.songCount ?? songsRes?.result?.songs?.length ?? 0,
    artists: artistsRes?.result?.artists ?? [],
    playlists: playlistsRes?.result?.playlists ?? [],
    albums: albumsRes?.result?.albums ?? []
  };
}

export function useSearchOverview(keyword: string) {
  return useSWR(
    keyword ? ['search-overview', keyword] : null,
    () => fetchSearchOverview(keyword),
    { revalidateOnFocus: false }
  );
}

export function useSearchCloudTab(
  keyword: string,
  type: SearchCloudType,
  enabled: boolean,
  limit = 30
) {
  return useSWR(
    keyword && enabled ? ['cloudsearch', keyword, type, limit] : null,
    async () => {
      const data = await searchCloudTyped(keyword, type, limit);
      return data?.result ?? null;
    },
    { revalidateOnFocus: false }
  );
}
