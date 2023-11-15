'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function Playlist({ data }: { data: Playlist[] }) {
  const router = useRouter();
  const handleClick = async (id: number) => {
    router.push(`/playlist/${id}`);
  };
  return (
    <div>
      <h2>热门歌单</h2>
      <hr />
      <ol className="space-y-2 columns-1 md:columns-2">
        {data.map((playlist) => (
          <li
            key={playlist.name}
            onClick={() => handleClick(playlist.id)}
            className="hover:cursor-pointer">
            <div className="flex items-center space-x-2">
              <div className="not-prose">
                <Image
                  title={playlist.id.toString()}
                  src={playlist.coverImgUrl}
                  alt={playlist.name}
                  width={22}
                  height={22}
                  className="rounded-full"
                />
              </div>
              <div>{playlist.name}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
