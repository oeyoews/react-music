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
        <div className="flex justify-start items-center">
          <FaSearch className="inline mx-2" />
          音乐搜索
        </div>
      }
      className="p-2 w-full mx-0 !my-0 bg-transparent"
    >
      <Search />
      <HotSongComponent />
    </DrawserComponent>
  );
}
