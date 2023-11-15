import Song from '~app/ui/Song';
import { getHotPlayList, getPlayListSongs } from '~lib/playlist';

export default async function Page({ params }: any) {
  const { slug } = params;
  const musicdata = await getHotPlayList();
  const { description, name } = musicdata.playlists[0];
  const { songs } = await getPlayListSongs(Number(slug));
  return (
    <div className="my-2">
      <h1>{name}</h1>
      <p>{description}</p>
      <hr />
      <ol>
        {songs.map((song) => (
          <Song data={song} key={song.id} />
        ))}
      </ol>
    </div>
  );
}
