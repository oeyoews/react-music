'use client';

import useTitle from '~lib/hooks/useTitle';
import { lazy, useCallback, useEffect, useRef, useState } from 'react';
import { AplayerMethods, AplayerProps } from 'react-aplayer';
import { toast } from 'react-hot-toast';
import {
  useArtistData,
  useMusicURL,
  useSongDetailData,
  useLyric,
} from '~lib/hooks';

import Spinner from '../Spinner';

const ReactAplayer = lazy(() => import('react-aplayer'));

export default function APlayer({ slug }: { slug: string }) {
  const { data: musicData, isLoading: isLoadingURL } = useMusicURL(slug);
  const { data: songData, isLoading: isLoadingSongData } =
    useSongDetailData(slug);

  const apRef = useRef<AplayerMethods | null>();

  const onInit = (aplayer: AplayerMethods) => {
    if (!apRef.current) {
      apRef.current = aplayer;
    }
  };

  const { setTitle, setVanillaTitle } = useTitle();

  useEffect(() => {
    apRef.current?.on('ended', () => {
      toast('歌曲播放完毕');
      setTitle(`${songData?.songs[0].name} - 歌曲播放结束`);
    });

    return () => {
      setVanillaTitle();
      apRef.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songData]);

  const arId = songData?.songs[0]?.ar[0].id;
  const { data: artistData, isLoading: isLoadingArtist } = useArtistData(arId!);
  const { data: lyric, isLoading: isLoadingLyric } = useLyric(slug);

  if (isLoadingArtist || isLoadingLyric || isLoadingURL || isLoadingSongData) {
    return <Spinner />;
  }

  const audio = [
    {
      name: songData?.songs?.[0].name,
      url:
        musicData.data?.[0].url ||
        `//music.163.com/song/media/outer/url?id=${slug}.mp3`,
      lrc: lyric?.lrc?.lyric,
      artist: artistData?.data.artist.name,
      cover: artistData?.data.artist.cover,
    },
  ];

  const options: Partial<AplayerProps> = {
    theme: '#b7daff',
    storageName: 'react-aplayer-setting',
    // mini: true,
    // fixed: true, // if fixed, not destroy
    lrcType: 1, // 1: lrc 内容 3: file
    audio,
    onInit,
    loop: 'none',
    onPlay: () => {
      setTitle(`正在播放 ${songData?.songs?.[0].name}`);
      toast.success('播放歌曲');
    },
    onPause: () => {
      setTitle(`暂停播放 ${songData?.songs?.[0].name}`);
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
        <div>
          {/* TODO: 更像是内部的ref问题 */}
          <ReactAplayer {...options} />
          {/* {JSON.stringify(audio)} */}
        </div>
      )}
    </div>
  );
}
