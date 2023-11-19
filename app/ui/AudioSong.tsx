'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { checkSong, getMusicURL } from '~lib/search';
import { toast } from 'react-hot-toast';
import Spinner from './Spinner';
import useSWR from 'swr';

export default function AudioSong({
  // src,
  songInfo,
  artist,
}: {
  songInfo: SongDetail;
  artist: Artist;
}) {
  const { data: musicURLData, isLoading } = useSWR('audio', () =>
    getMusicURL(songInfo.id, localStorage.cookie),
  );
  const musicURL = musicURLData?.data[0].url;

  useEffect(() => {
    checkSong(songInfo.id, localStorage.cookie).then((res) => {
      if (!res.success) {
        toast.error(res.message);
      }
    });
  }, [songInfo, musicURL]);

  // TODO: 使用外链, vip 歌曲自然就不能播放了
  // const baseURL = 'https://music.163.com/song/media/outer/url?id=';
  // if (!songInfo.id) return <>loading ...</>;
  // const url = `${baseURL}${songInfo.id}.mp3`;
  // @ts-ignore
  // 即使使用use-client, 客户端组件在服务端也会渲染, 除非使用useeffect, 这里使用dynamic
  const ReactAplayer = dynamic(() => import('react-aplayer'), { ssr: false });

  const props = {
    theme: '#F57F17',
    lrcType: 3,
    audio: [
      {
        name: songInfo.name,
        artist: songInfo.ar[0].name,
        url: musicURL,
        lrc: '', // 外链会自动获取???
        cover: artist.avatar,
        // lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.lrc',
        // theme: 'lightred',
      },
    ],
  };

  const apRef = useRef<any>(null);

  // ??? instance
  const onInit = (instance: any) => {
    if (!apRef.current) {
      apRef.current = instance;
    }
    toast.success('歌曲加载成功', { duration: 2000 });
  };

  return (
    // TODO: add suspense
    <div>
      {/* <audio controls src={src} title={src} /> */}
      {/* TODO: use react-aplayer??? */}
      {/* <audio controls src={`${baseURL}/${id}.mp3`} // title={src} */}
      <div className="w-full">
        <div className="flex justify-center items-center">
          {isLoading && <Spinner />}
        </div>
        {!isLoading && (
          <ReactAplayer
            {...props}
            // @ts-ignore
            onInit={onInit}
            onPlay={() => toast('播放歌曲')}
            onPause={() => toast('暂停歌曲')}
          />
        )}
      </div>
      {/* TODO: add copybutton or download url */}
      {/* // @ts-ignore */}
      {/* <button onClick={() => apRef.toggle()}>toggle</button> */}
    </div>
  );
}
