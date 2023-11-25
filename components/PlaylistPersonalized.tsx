'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SlEarphones } from 'react-icons/sl';
import { usePlaylistPersonalized } from '~lib/hooks';

// TODO 合并类型
export default function PlaylistPersonalized() {
  const { data: playlist } = usePlaylistPersonalized();
  return (
    <div>
      <h2>推荐歌单</h2>
      {/* TODO: add more */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-6 my-4">
        {playlist?.result.slice(0, 12).map((item) => (
          <div key={item.name} className="hover:cursor-pointer flex flex-col">
            <Link href={`/playlist/${item.id}`} className="rounded-md">
              <div className="flex overflow-hidden rounded-md relative">
                <div className="not-prose group">
                  <Image
                    title="点击进入歌单"
                    src={item.picUrl}
                    alt={item.name}
                    width={256}
                    height={256}
                    className="rounded-md hover:scale-125 transition-all duration-500"
                  />
                  <div className="rounded-tl-md flex items-center justify-end absolute bottom-0 right-0 group-hover:invisible backdrop-blur-md px-1 transition-all">
                    <SlEarphones className="inline mr-1 w-3 h-3" />
                    {item.playCount > 10000
                      ? `${(item.playCount / 10000).toFixed(1)}万`
                      : item.playCount}
                  </div>
                </div>
              </div>
              <div className="text-sm mt-2 hover:text-rose-500 transition-all">
                {item.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
