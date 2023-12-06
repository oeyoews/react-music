'use client';

import Search from '~components/Search';
import HotSongs from '~components/HotSongs';
import { searchHotDetail } from '~lib/search';
import useSWR from 'swr';
import SkeletonSongs from '~components/ui/SkeletonSongs';

const HotSongComponent = () => {
  const { data, isLoading } = useSWR('/search/hot/detail', searchHotDetail);

  return isLoading ? (
    <SkeletonSongs count={20} />
  ) : (
    <HotSongs data={data?.data!} />
  );
};

export default function page() {
  return (
    <>
      <Search />
      <HotSongComponent />
    </>
  );
}
