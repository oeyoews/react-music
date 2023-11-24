'use client';

import Spinner from '~components/Spinner';

import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { AplayerMethods, AplayerProps } from 'react-aplayer';
import { toast } from 'react-hot-toast';
import { getMusicURL } from '~lib/search';

// https://react.dev/reference/react/lazy#troubleshooting
const ReactAplayer = lazy(() => import('react-aplayer'));

// 由于要获取cookie, 所以只能在client
export default function APlayer({
  data,
  slug,
  lyric,
  arId,
}: {
  data: any;
  slug: string;
  lyric: string;
  arId: Id;
}) {
  const apRef = useRef<AplayerMethods | null>();

  const [artistData, setArtistData] = useState<IArtistDetail>();
  const [musicURL, setMusicURL] = useState<IMusicURL>();

  useEffect(() => {
    const vanillaTitle = document.title;
    apRef.current?.on('ended', () => {
      toast('歌曲播放完毕');
      document.title = `${data?.songs[0].name} - 歌曲播放结束`;
    });
    return () => {
      document.title = vanillaTitle;
      apRef.current?.destroy();
    };
  }, [data.songs]);

  useEffect(() => {
    const cookie = localStorage.cookie;
    getMusicURL(slug, cookie).then((res) => {
      setMusicURL(res.body);
    });

    fetch('/api/artist_detail', {
      method: 'POST',
      body: JSON.stringify({ cookie, id: arId }),
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setArtistData(data.data);
      });
  }, [arId, slug]);

  const onInit = (aplayer: AplayerMethods) => {
    if (!apRef.current) {
      apRef.current = aplayer;
    }
    // apRef.current.on('error', () => toast.error('歌曲加载失败'));
    // apRef.current?.on('loadeddata', () => toast('歌曲加载成功'));
    // apRef.current.on('loadedmetadata', () => toast('歌曲信息加载成功'));
    // apRef.current.on('loadstart', () => toast('hhh'));
  };

  const url = musicURL?.data[0].url;
  const artist = artistData?.data.artist.name;
  const cover = artistData?.data.artist.cover;
  const audio = [
    {
      name: data?.songs?.[0].name,
      url,
      lrc: lyric,
      artist,
      cover: artistData?.data.artist.cover,
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
      document.title = `正在播放 ${data?.songs?.[0].name}`;
      toast.success('播放歌曲');
    },
    onPause: () => {
      document.title = `暂停播放 ${data?.songs?.[0].name}`;
      // apRef.current?.on('pause', () => toast('歌曲播放暂停'));
      // apRef.current?.on('ended', () => toast('歌曲播放完毕'));
      toast('歌曲暂停');
    },
  };

  /* TODO: add copybutton or download url */
  return (
    // TODO: 这里的数据必须要等待完全获取, 在进行渲染, 直接修改 变量是不会刷新的
    // feat: use swr
    <div className="w-full top-[52px]">
      {(!url || !cover || !artist) && <Spinner size={68}/>}
      {url && cover && artist && <ReactAplayer {...options} />}
    </div>
  );
}
