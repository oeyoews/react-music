'use client';

import Search from '~components/Search';
import HotSongs from '~components/HotSongs';
import { searchHotDetail } from '~lib/search';
import useSWRImmutable from 'swr/immutable';

// TODO: more element
export default function page() {
  const HotSongComponent = () => {
    const { data, isLoading } = useSWRImmutable(
      '/search/hot/detail',
      searchHotDetail,
    );

    return !isLoading && <HotSongs data={data?.data!} />;
  };

  return (
    <div>
      <Search />
      <HotSongComponent />
    </div>
  );
}
