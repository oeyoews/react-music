import Link from 'next/link';

export default function HotSongs({ data }: { data: HotDetail[] }) {
  return (
    <div>
      <h2>热门歌曲</h2>
      <ul className="columns-1 md:columns-2">
        {data.map((song) => (
          <li key={song.searchWord} className="mt-0">
            <Link
              className="flex items-center"
              href={`/search?searchWord=${song.searchWord}`}>
              <div key={song.searchWord}>{song.searchWord}</div>
              {song.content && <div> -- {song.content}</div>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
