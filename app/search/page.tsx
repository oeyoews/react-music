'use client';

import Search from '~components/Search';
import HotSongs from '~components/HotSongs';
import { searchHotDetail } from '~lib/search';
import useSWR from 'swr';
import SkeletonSongs from '~components/ui/SkeletonSongs';
import { SearchResult } from '~components/Search/SearchResult';

const HotSongComponent = () => {
  const { data, isLoading } = useSWR('/search/hot/detail', searchHotDetail);

  return isLoading ? (
    <SkeletonSongs count={20} />
  ) : (
    <HotSongs data={data?.data!} />
  );
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: {
    searchWord: string;
  };
}) {
  return (
    <>
      {JSON.stringify(searchParams, null, 2)}
      <Search />
      {!searchParams.searchWord ? (
        <HotSongComponent />
      ) : (
        <SearchResult searchWord={searchParams.searchWord} />
      )}
    </>
  );
}
