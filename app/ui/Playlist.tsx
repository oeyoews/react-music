import Link from 'next/link';
import Image from 'next/image';

export default function Playlist({ data }: { data: Playlist[] }) {
  return (
    <div>
      <h2>热门歌单</h2>
      <hr />
      <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
        {data.map((playlist) => (
          <div
            key={playlist.name}
            className="hover:cursor-pointer flex flex-col group">
            <Link href={`/playlist/${playlist.id}`} className="rounded-md">
              <div className="flex overflow-hidden rounded-md">
                <div className="not-prose hover:scale-125 transition-all duration-500 ease-out">
                  <Image
                    title="点击进入歌单"
                    src={playlist.coverImgUrl}
                    alt={playlist.name}
                    width={256}
                    height={256}
                    className="rounded-md"
                  />
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
