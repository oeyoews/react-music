'use client';

import { lazy, useCallback, useEffect, useRef } from 'react';
import { AplayerMethods, AplayerProps } from 'react-aplayer';
import { toast } from 'react-hot-toast';
import {
  useArtistData,
  useMusicURL,
  useSongDetailData,
  useLyric,
} from '~lib/hooks';
import Spinner from '../Spinner';

// TODO: 如何重新加载aplayer on failed
// https://react.dev/reference/react/lazy#troubleshooting
const ReactAplayer = lazy(() => import('react-aplayer'));

export default function APlayer({ slug }: { slug: string }) {
  const { data: musicData, isLoading: isLoadingURL } = useMusicURL(slug);
  const { data: songData, isLoading: isLoadingSongData } =
    useSongDetailData(slug);

  let apRef = useRef<AplayerMethods | null>();

  const onInit = useCallback((aplayer: AplayerMethods) => {
    if (!apRef.current) {
      apRef.current = aplayer;
    }
  }, []);

  // 现在useeffect 跑两次, 导致apRef.current 为null
  useEffect(() => {
    const vanillaTitle = document.title;
    apRef.current?.on('ended', () => {
      toast('歌曲播放完毕');
      document.title = `${songData?.songs[0].name} - 歌曲播放结束`;
    });
    return () => {
      document.title = vanillaTitle;
      apRef.current?.destroy();
      toast('退出播放');
    };
  }, [songData, onInit]);

  const arId = songData?.songs[0]?.ar[0].id;
  const { data: artistData, isLoading: isLoadingArtist } = useArtistData(arId!);
  const { data: lyric, isLoading: isLoadingLyric } = useLyric(slug);

  if (isLoadingArtist || isLoadingLyric || isLoadingURL || isLoadingSongData) {
    return <Spinner />;
  }

  const audio = [
    {
      name: songData?.songs?.[0].name,
      url: musicData.data?.[0].url,
      lrc:
        lyric?.lrc?.lyric ||
        `//music.163.com/song/media/outer/url?id=${slug}.mp3`,
      artist: artistData?.data.artist.name,
      cover: artistData?.data.artist.cover,
    },
  ];

  // 关于artplayer 提到的刷新问题
  const options: Partial<AplayerProps> = {
    theme: '#b7daff',
    storageName: 'react-aplayer-setting',
    // theme: '#F57F17',
    // mini: true,
    // fixed: true, // if fixed, not destroy
    lrcType: 1, // 1: lrc 内容 3: file
    audio,
    onInit,
    loop: 'none',
    onPlay: () => {
      document.title = `正在播放 ${songData?.songs?.[0].name}`;
      toast.success('播放歌曲');
    },
    onPause: () => {
      document.title = `暂停播放 ${songData?.songs?.[0].name}`;
      // apRef.current?.on('pause', () => toast('歌曲播放暂停'));
      // apRef.current?.on('ended', () => toast('歌曲播放完毕'));
      toast('歌曲暂停');
    },
  };

  /* TODO: add copybutton or download url */
  return (
    // TODO: stick absolute
    <div className="w-full top-[52px]">
      {isLoadingURL ||
      isLoadingSongData ||
      isLoadingArtist ||
      isLoadingLyric ? (
        <Spinner />
      ) : (
        <ReactAplayer {...options} />
      )}
    </div>
  );
}
