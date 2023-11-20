'use client';

import { lazy, useEffect, useRef } from 'react';
import { AplayerMethods, AplayerProps } from 'react-aplayer';
import { toast } from 'react-hot-toast';
import {
  useArtistData,
  useMusicURL,
  useSongDetailData,
  useLyric,
} from '~app/hooks';

// https://react.dev/reference/react/lazy#troubleshooting
const ReactAplayer = lazy(() => import('react-aplayer'));

export default function AudioSong({ slug }: { slug: string }) {
  const { url, isLoading } = useMusicURL(slug);
  const { songs } = useSongDetailData(slug);
  const { artist } = useArtistData(slug);
  const { data: lyric, isLoading: isLoadingLyric } = useLyric(slug);

  const apRef = useRef<AplayerMethods | null>();

  const onInit = (aplayer: AplayerMethods) => {
    if (!apRef.current) {
      apRef.current = aplayer;
    }
    toast.success('歌曲加载成功', { duration: 1000 });
  };

  const audio = [
    {
      name: songs[0].name,
      artist: artist.name,
      url,
      lrc: lyric?.lrc.lyric,
      cover: artist?.avatar,
    },
  ];

  const options: Partial<AplayerProps> = {
    theme: 'red',
    // mini: true,
    // fixed: true, // if fixed, not destroy
    lrcType: 1,
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
      {!isLoading && !isLoadingLyric && <ReactAplayer {...options} />}
    </div>
  );
}
