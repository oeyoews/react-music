'use client';

import Search from '~components/Search';
import HotSongs from '~components/HotSongs';
import { searchHotDetail } from '~lib/search';
import useSWRImmutable from 'swr/immutable';
import DrawserComponent from '~components/DrawserComponent';
import { FaSearch } from 'react-icons/fa';
import SkeletonSongs from './ui/SkeletonSongs';

const HotSongComponent = () => {
  const { data, isLoading } = useSWRImmutable(
    '/search/hot/detail',
    searchHotDetail
  );

  return isLoading ? (
    <SkeletonSongs count={20} />
  ) : (
    <HotSongs data={data?.data!} />
  );
};

// TODO: more element
export default function SidebarSearchMusic() {
  return (
    <DrawserComponent
      text={
        <div>
          <FaSearch className="inline mx-2" />
          搜索音乐
        </div>
      }
    >
      <Search />
      <HotSongComponent />
    </DrawserComponent>
  );
}
