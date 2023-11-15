import {
  getSongLyric,
  search,
  searchHot,
  getPlayList,
  getMusicURL,
  getMusicURLNEW,
  getbanners,
  getHotPlayList,
} from '~lib/search';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';

import { unstable_cache } from 'next/cache';

export default async function Home() {
  const { result } = await search('海阔天空');
  const songstop = await searchHot();
  const { playlist } = await getPlayList(24381616);
  const { banners } = await getbanners();
  const { playlists } = await getHotPlayList();
  // const { data } = await getMusicURL(28798452);
  // const { data } = await getMusicURLNEW(28798452, 'standard');
  // const lyric = await getSongLyric(28798452);

  return (
    <div className='prose mx-auto max-w-4xl'>
      {/* <audio controls>
        <source src={data?.[0].url} type='audio/mpeg' />
      </audio> */}
      {/* {result.songs.map(({ name, artists, id }) => (
        <div key={id}>{name}</div>
      ))} */}

      <div className='grid grid-cols-1 md:grid-cols-3 gap-3 not-prose m-2'>
        {banners.map((banner) => (
          <div key={banner.imageUrl}>
            {/* <span>{banner.typeTitle}</span> */}
            <Image
              src={banner.imageUrl}
              alt={banner.typeTitle}
              loading='eager'
              width={300}
              height={300}
              className='rounded w-full'
            />
          </div>
        ))}
      </div>

      <h2>热门歌单</h2>
      <hr />
      <ol className='space-y-2 columns-2'>
        {playlists.map((playlist) => (
          <div className='flex'>
            <li key={playlist.id} className='space-x-2'>
              <div>{playlist.name}</div>
            </li>
            {/* <div className='not-prose'>
              <Image
                src={playlist.coverImgUrl}
                alt={playlist.name}
                width={22}
                height={22}
                className='rounded-full'
              />
            </div> */}
          </div>
        ))}
      </ol>

      <h2>热门歌曲</h2>
      <hr />
      <ol className='columns-2'>
        {songstop.data.map((song) => (
          <div className='flex flex-row' key={song.searchWord}>
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
