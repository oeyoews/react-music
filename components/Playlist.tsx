import Link from 'next/link';
import Image from 'next/image';
import { SlEarphones } from 'react-icons/sl';

export default function Playlist({ data }: { data: Playlist[] }) {
  return (
    <div>
      <h2>热门歌单</h2>
      {/* TODO: add more */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-6 my-4">
        {data.slice(0, 12).map((playlist) => (
          <div
            key={playlist.name}
            className="hover:cursor-pointer flex flex-col"
          >
            <Link href={`/playlist/${playlist.id}`} className="rounded-md">
              <div className="flex overflow-hidden rounded-md relative">
                <div className="not-prose group">
                  <Image
                    unoptimized
                    title="点击进入歌单"
                    src={playlist.coverImgUrl}
                    alt={playlist.name}
                    width={256}
                    height={256}
                    priority={true}
                    className="rounded-md hover:scale-125 transition-all duration-500"
                  />
                  <div className="rounded-tl-md flex items-center justify-end absolute bottom-0 right-0 group-hover:invisible backdrop-blur-md px-1 transition-all">
                    <SlEarphones className="inline mr-1 w-3 h-3" />
                    {playlist.playCount > 10000
                      ? `${(playlist.playCount / 10000).toFixed(1)}万`
                      : playlist.playCount}
                  </div>
                </div>
              </div>
              <div className="text-sm mt-2 hover:text-rose-500 transition-all">
                {playlist.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
