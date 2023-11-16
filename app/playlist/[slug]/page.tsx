import { getHotPlayList, getPlayListSongs } from '~lib/playlist';
import Link from 'next/link';

export default async function Page({ params }: any) {
  const { slug } = params;
  const musicdata = await getHotPlayList();
  const { description, name } = musicdata.playlists[0];
  const { songs } = await getPlayListSongs(Number(slug));
  return (
    <div className="my-2">
      <h1>{name}</h1>
      <p className="line-clamp-2">{description}</p>
      <hr />
      <ol>
        {songs.map((song) => (
          <li key={song.id}>
            <Link href={`/song/${song.id}`} className="no-underline">
              {song.name}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
