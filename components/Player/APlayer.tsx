'use client';

import Spinner from '~components/Spinner';

import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { AplayerMethods, AplayerProps } from 'react-aplayer';
import { toast } from 'react-hot-toast';
import { getArtistDetail, getMusicURL } from '~lib/search';
import ReactAplayer from 'react-aplayer';

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

  // 需要cookie , 如何分离出去
  useEffect(() => {
    const cookie = localStorage.cookie;
    getMusicURL(slug, cookie).then((res) => {
      setMusicURL(res);
    });

    getArtistDetail(arId).then((res) => {
      setArtistData(res);
    });
  }, [arId, slug]);

  useEffect(() => {
    const vanillaTitle = document.title;
    apRef.current?.on('ended', () => {
      toast('歌曲播放完毕');
      document.title = `${data?.songs[0].name} - 歌曲播放结束`;
    });
    return () => {
      document.title = vanillaTitle;
      // TODO: 开发, 刷新后, 会丢失
      // apRef.current?.destroy();
    };
  }, [data.songs]);

  const onInit = (aplayer: AplayerMethods) => {
    if (!apRef.current) {
      apRef.current = aplayer;
    }
  };

  const url = musicURL?.data[0].url;
  const tempouterurl = (id: Id) =>
    `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
  const artist = artistData?.data.artist?.name;
  const cover = artistData?.data.artist?.cover;
  const audio = [
    {
      name: data?.songs?.[0].name,
      url: url || tempouterurl(slug),
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
      toast('歌曲暂停');
    },
  };

  return (
    // TODO: 这里的数据必须要等待完全获取, 在进行渲染, 直接修改 变量是不会刷新的
    <div className="w-full top-[52px]">
      {(!cover || !artist) && <Spinner size={68} />}
      {cover && lyric && <ReactAplayer {...options} />}
    </div>
  );
}
