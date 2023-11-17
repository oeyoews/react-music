'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';

export default function AudioSong({
  // src,
  isAvailable,
  songInfo,
  lrc,
  cover,
}: {
  // src: string;
  isAvailable: CheckSong;
  songInfo: SongDetail;
  lrc: Lrc;
  cover: string;
}) {
  if (!isAvailable.success) {
    // TODO: 即使能播放, 也提示无版权, thunder client 提示有版权, 需要登录吗 本地开发时默认登录的???
    // toast.error(isAvailable.message);
    // return <></>;
  }

  const baseURL = 'https://music.163.com/song/media/outer/url?id=';
  // if (!songInfo.id) return <>loading ...</>;
  const url = `${baseURL}${songInfo.id}.mp3`;
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
        url,
        lrc: '', // 外链会自动获取???
        cover,
        // lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.lrc',
        // theme: 'lightred',
      },
    ],
  };

  const apRef = useRef<any>(null);

  const onInit = (instance: any) => {
    if (!apRef.current) {
      apRef.current = instance;
    }
  };

  return (
    <div className="flex justify-center items-center">
      {/* <audio controls src={src} title={src} /> */}
      {/* TODO: use react-aplayer??? */}
      {/* <audio controls src={`${baseURL}/${id}.mp3`} // title={src} */}
      <div className="w-full">
        <ReactAplayer
          {...props}
          // @ts-ignore
          onInit={onInit}
          // onPlay={onPlay}
          // onPause={onPause}
        />
      </div>
      {/* // @ts-ignore */}
      {/* <button onClick={() => apRef.toggle()}>toggle</button> */}
    </div>
  );
}
