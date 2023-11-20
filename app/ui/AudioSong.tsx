'use client';

import { lazy, useEffect, useRef } from 'react';
import { AplayerMethods, AplayerProps } from 'react-aplayer';
import { toast } from 'react-hot-toast';
import { useArtistData, useMusicURL, useSongDetailData } from '~app/hooks';

// https://react.dev/reference/react/lazy#troubleshooting
const ReactAplayer = lazy(() => import('react-aplayer'));

export default function AudioSong({ slug }: { slug: string }) {
  // const baseURL = 'https://music.163.com/song/media/outer/url?id=';
  // if (!songInfo.id) return <>loading ...</>;
  // 即使使用use-client, 客户端组件在服务端也会渲染, 除非使用useeffect, 这里使用dynamic
  // @ts-ignore
  const { url, isLoading } = useMusicURL(slug);
  const { songs } = useSongDetailData(slug);
  const { artist } = useArtistData(slug);

  const apRef = useRef<AplayerMethods | null>();

  // ??? instance
  const onInit = (aplayer: AplayerMethods) => {
    if (!apRef.current) {
      apRef.current = aplayer;
    }
    toast.success('歌曲加载成功', { duration: 1000 });
  };

  const props: AplayerProps = {
    theme: '#F57F17',
    lrcType: 3,
    audio: [
      {
        name: songs[0].name,
        artist: artist.name,
        url,
        lrc: '', // 外链会自动获取???  lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.lrc',
        cover: artist?.avatar,
      },
    ],
    onInit,
    onPlay: () => toast.success('播放歌曲'),
    onPause: () => toast('暂停歌曲'),
  };

  useEffect(() => {
    return () => {
      // in.destory();
      // TODO: 没有这个方法
      // apRef.current?.destory();
      apRef.current?.destroy();
      toast('退出播放');
    };
  }, []);

  /* TODO: add copybutton or download url */
  return (
    <div className="w-full">{!isLoading && <ReactAplayer {...props} />}</div>
  );
}
