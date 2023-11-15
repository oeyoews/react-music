import {
  getSongLyric,
  search,
  searchHot,
  getPlayList,
  getMusicURL,
  getMusicURLNEW,
} from '~lib/search';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';

import { unstable_cache } from 'next/cache';

export default async function Home() {
  const { result } = await search('海阔天空');
  const songstop = await searchHot();
  const { playlist } = await getPlayList(24381616);
  // const { data } = await getMusicURL(28798452);
  // const { data } = await getMusicURLNEW(28798452, 'standard');
  // const lyric = await getSongLyric(28798452);

  return (
    <div className='prose mx-auto max-w-2xl'>
      {/* <audio controls>
        <source src={data?.[0].url} type='audio/mpeg' />
      </audio> */}
      {/* {result.songs.map(({ name, artists, id }) => (
        <div key={id}>{name}</div>
      ))} */}
      <h2>热门歌曲</h2>
      <hr />
      <ol>
        {songstop.data.map((song) => (
          <div className='flex flex-row'>
            {/* {song.iconUrl && (
              <div>
                <Image
                  src={song.iconUrl as string}
                  alt={song.searchWord}
                  width={22}
                  height={22}
                  className='rounded-full'
                />
              </div>
            )} */}
            <li key={song.searchWord}>
              {song.searchWord}
              {song.content && <div> -- {song.content}</div>}
            </li>
          </div>
        ))}
      </ol>
    </div>
  );
}
