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
import Spinner from '../Spinner';

// https://react.dev/reference/react/lazy#troubleshooting
const ReactAplayer = lazy(() => import('react-aplayer'));

export default function APlayer({ slug }: { slug: string }) {
  const { data: musicData, isLoading: isLoadingURL } = useMusicURL(slug);
  const { data: songData, isLoading: isLoadingSongData } =
    useSongDetailData(slug);
  const { data: lyric, isLoading: isLoadingLyric } = useLyric(slug);

  const { data: artistData, isLoading: isloadingArtist } = useArtistData(slug);

  const apRef = useRef<AplayerMethods | null>();

  useEffect(() => {
    const vanillaTitle = document.title;

    apRef.current?.on('ended', () => {
      toast('歌曲播放完毕');
      document.title = `${songData.songs[0].name} - 歌曲播放结束`;
    });
    return () => {
      document.title = vanillaTitle;
      apRef.current?.destroy();
      // toast('退出播放');
    };
  }, []);

  const onInit = (aplayer: AplayerMethods) => {
    if (!apRef.current) {
      apRef.current = aplayer;
    }
    // apRef.current.on('error', () => toast.error('歌曲加载失败'));
    // apRef.current?.on('loadeddata', () => toast('歌曲加载成功'));
    // apRef.current.on('loadedmetadata', () => toast('歌曲信息加载成功'));
    // apRef.current.on('loadstart', () => toast('hhh'));
  };

  const audio = [
    {
      name: songData.songs?.[0].name,
      artist: artistData.data.artist.name,
      url: musicData.data?.[0].url,
      lrc: lyric?.lrc?.lyric,
      cover: artistData.data.artist.cover,
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
    loop: 'none',
    onPlay: () => {
      document.title = `正在播放 ${songData.songs?.[0].name}`;
      toast.success('播放歌曲');
    },
    onPause: () => {
      document.title = `暂停播放 ${songData.songs?.[0].name}`;
      // apRef.current?.on('pause', () => toast('歌曲播放暂停'));
      // apRef.current?.on('ended', () => toast('歌曲播放完毕'));
      // toast('歌曲暂停');
    },
  };

  /* TODO: add copybutton or download url */
  return (
    <div className="w-full">
      <Suspense
        fallback={
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        }>
        {/* {!isLoadingURL && !isLoadingLyric && !isloadingArtist && !isLoadingSongData && (
          <ReactAplayer {...options} />
        )} */}
        <ReactAplayer {...options} />
      </Suspense>
    </div>
  );
}
