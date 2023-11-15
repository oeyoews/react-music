import Image from 'next/image';
export default function Playlist({ data }: { data: Playlist[] }) {
  return (
    <div>
      <h2>热门歌单</h2>
      <hr />
      <ol className="space-y-2 columns-1 md:columns-2">
        {data.map((playlist) => (
          <li key={playlist.name}>
            <div className="flex items-center space-x-2">
              <div className="not-prose">
                <Image
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
