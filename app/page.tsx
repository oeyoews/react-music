import { search, searchTop, getPlayList, getMusicURL } from '~lib/search';

import { unstable_cache } from 'next/cache';

export default async function Home() {
  const { result } = await search('海阔天空');
  const songstop = await searchTop(6542);
  const { playlist } = await getPlayList(24381616);
  const { data } = await getMusicURL(28798452);

  return (
    <div>
      <audio controls>
        <source src={data[0].url} type='audio/mpeg' />
      </audio>
      {result.songs.map(({ name, artists, id }) => (
        <div key={id}>{name}</div>
      ))}
      <hr />
      {songstop.songs.map((song) => (
        <div key={song.id}>{song.name}</div>
      ))}
    </div>
  );
}
