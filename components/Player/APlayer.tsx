'use client';

import useTitle from '~lib/hooks/useTitle';
import { useEffect, useRef } from 'react';
// import ReactAplayer from 'react-aplayer';
import { AplayerMethods, AplayerProps } from 'react-aplayer';
import { toast } from 'react-hot-toast';
import {
  useArtistData,
  useMusicURL,
  useSongDetailData,
  useLyric,
} from '~lib/hooks';
import APlayerSkeleton from '~components/ui/AplayerSkelelon';
import dynamic from 'next/dynamic';

const ReactAplayer = dynamic(() => import('react-aplayer'), { ssr: false });

export default function APlayer({ slug }: { slug: string }) {
  const apRef = useRef<AplayerMethods | null>();

  const { data: musicData, isLoading: isLoadingURL } = useMusicURL(slug);
  const { data: songData, isLoading: isLoadingSongData } =
    useSongDetailData(slug);
  const { setTitle, setVanillaTitle } = useTitle();

  const onInit = (aplayer: AplayerMethods) => {
    if (!apRef.current) {
      apRef.current = aplayer;
    }
  };

  useEffect(() => {
    return () => {
      setVanillaTitle();
      apRef.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const arId = songData?.songs[0]?.ar[0].id;

  const { data: artistData, isLoading: isLoadingArtist } = useArtistData(arId!);
  const { data: lyric, isLoading: isLoadingLyric } = useLyric(slug);

  if (isLoadingArtist || isLoadingLyric || isLoadingURL || isLoadingSongData) {
    return <APlayerSkeleton />;
  }

  apRef.current?.on('ended', () => {
    toast('歌曲播放完毕');
    setTitle(`${songData?.songs[0].name} - 歌曲播放结束`);
  });

  const audio = [
    {
      name: songData?.songs?.[0].name,
      url:
        musicData?.data?.[0].url ||
        `//music.163.com/song/media/outer/url?id=${slug}.mp3`,
      lrc: lyric?.lrc?.lyric,
      artist: artistData?.data?.artist.name,
      cover: artistData?.data?.artist.cover,
    },
  ];

  const options: Partial<AplayerProps> = {
    theme: '#b7daff',
    storageName: 'react-aplayer-setting',
    lrcType: 1,
    audio,
    onInit,
    loop: 'none',
    onPlay: () => {
      setTitle(`正在播放 ${songData?.songs?.[0].name}`);
      toast.success('播放歌曲');
    },
    onPause: () => {
      setTitle(`暂停播放 ${songData?.songs?.[0].name}`);
      toast('歌曲暂停');
    },
  };

  return <ReactAplayer {...options} />;
}
