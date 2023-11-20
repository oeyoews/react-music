'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';
import { useArtistData, useMusicURL, useSongDetailData } from '~app/hooks';

export default function AudioSong({ slug }: { slug: string }) {
  // const baseURL = 'https://music.163.com/song/media/outer/url?id=';
  // if (!songInfo.id) return <>loading ...</>;
  // 即使使用use-client, 客户端组件在服务端也会渲染, 除非使用useeffect, 这里使用dynamic
  // @ts-ignore
  const { url, isLoading } = useMusicURL(slug);
  const { songs } = useSongDetailData(slug);
  const { artist } = useArtistData(slug);

  const props = {
    theme: '#F57F17',
    lrcType: 3,
    audio: [
      {
        name: songs[0].name,
        artist: artist.name,
        url,
        lrc: '', // 外链会自动获取???
        cover: artist?.avatar,
        // lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.lrc',
        // theme: 'lightred',
      },
    ],
  };

  // @ts-ignore
  const ReactAplayer = dynamic(() => import('react-aplayer'), { ssr: false });
  const apRef = useRef<any>(null);

  // ??? instance
  const onInit = (instance: any) => {
    if (!apRef.current) {
      apRef.current = instance;
    }
    toast.success('歌曲加载成功', { duration: 1000 });
  };

  /* TODO: add copybutton or download url */
  return (
    <div className="w-full">
      {!isLoading && (
        <ReactAplayer
          {...props}
          // @ts-ignore
          onInit={onInit}
          onPlay={() => toast.success('播放歌曲')}
          onPause={() => toast('暂停歌曲')}
        />
      )}
    </div>
  );
}
