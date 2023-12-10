'use client';

import Link from 'next/link';
import Badge from '~components/Badge';
import { useSearch } from '~lib/hooks';
import SkeletonSongs from '~components/ui/SkeletonSongs';

export const SearchResult = ({ searchWord }: { searchWord: string }) => {
  const { data, isLoading } = useSearch(searchWord);
  if (isLoading) {
    return <SkeletonSongs count={10} />;
  }
  // if (data?.code !== 200) {
  //   toast.error(`搜索结果: ${data?.message}`);
  // }
  const vipids = data?.result.songs
    ?.filter((song) => song.fee == 1)
    .map((song) => song.id);

  return (
    <>
      {JSON.stringify(data, null, 2)}
      <h2>{searchWord}</h2>
      <ul className="columns-1 md:columns-2">
        {data?.result.songs?.map((song) => {
          return (
            <li className="mt-1" key={song.id}>
              <Link href={`/song?id=${song.id}`}>
                <div className="flex">
                  {song.name} -- {song.artists[0].name}
                  {vipids?.includes(song.id) ? (
                    <div>
                      <Badge
                        text={'VIP'}
                        className="text-red-500 mx-2 font-serif"
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
