'use client';

import { Suspense, lazy, useEffect, useRef } from 'react';
import { AplayerMethods, AplayerProps } from 'react-aplayer';
import { toast } from 'react-hot-toast';
import {
  useArtistData,
  useMusicURL,
  useSongDetailData,
  useLyric,
} from '~app/hooks';
import Spinner from './Spinner';

// https://react.dev/reference/react/lazy#troubleshooting
const ReactAplayer = lazy(() => import('react-aplayer'));

export default function AudioSong({ slug }: { slug: string }) {
  const { url, isLoading: isLoadingURL } = useMusicURL(slug);
  const { songs } = useSongDetailData(slug);
  const { artist } = useArtistData(slug);
  const { data: lyric, isLoading: isLoadingLyric } = useLyric(slug);

  const apRef = useRef<AplayerMethods | null>();

  const onInit = (aplayer: AplayerMethods) => {
    if (!apRef.current) {
      apRef.current = aplayer;
    }
    apRef.current?.on('loadeddata', () => toast('歌曲加载成功'));
    apRef.current.on('error', () => toast('歌曲加载失败'));
    apRef.current.on('loadedmetadata', () => toast('歌曲信息加载成功'));
    // apRef.current.on('loadstart', () => toast('hhh'));
  };

  const audio = [
    {
      name: songs?.[0].name,
      artist: artist.name,
      url,
      lrc: lyric?.lrc.lyric,
      cover: artist?.avatar,
    },
  ];

  // 关于artplayer 提到的刷新问题
  const options: Partial<AplayerProps> = {
    theme: 'red',
    // mini: true,
    // fixed: true, // if fixed, not destroy
    lrcType: 1, // 1: lrc 内容 3: file
    audio,
    onInit,
    onPlay: () => toast.success('播放歌曲'),
    onPause: () => toast('暂停歌曲'),
  };

  useEffect(() => {
    return () => {
      apRef.current?.destroy();
      toast('退出播放');
    };
  }, []);

  /* TODO: add copybutton or download url */
  return (
    <div className="w-full">
      <Suspense
        fallback={
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        }>
        {!isLoadingURL && !isLoadingLyric && <ReactAplayer {...options} />}
      </Suspense>
    </div>
  );
}
