import Link from 'next/link';
import Image from 'next/image';

export default function Playlist({ data }: { data: Playlist[] }) {
  return (
    <div>
      <h2>热门歌单</h2>
      <hr />
      <ol className="space-y-2 columns-1 md:columns-2">
        {data.map((playlist) => (
          <li key={playlist.name} className="hover:cursor-pointer">
            <Link href={`/playlist/${playlist.id}`} className="no-underline">
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
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
