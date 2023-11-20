'use client';

import { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';
import toast from 'react-hot-toast';
import Option from 'artplayer/types/option';

export default function ArtPlayer({
  url,
  className,
  id = url || '',
}: {
  url: string;
  className: string;
  id?: string;
}) {
  const artRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    !url && toast.error('未找到播放源');

    const option: Option = {
      id,
      url,
      container: artRef.current!,
      muted: false, // 默认静音
      autoplay: false,
      autoMini: false, // 不建议使用
      autoSize: false,
      playbackRate: true,
      aspectRatio: true,
      screenshot: true,
      setting: true,
      hotkey: true,
      pip: true,
      mutex: true, // TODO: 禁止多个视频同时播放
      fullscreen: true,
      fullscreenWeb: true,
      loop: true,
      subtitleOffset: true,
      playsInline: true,
      lock: true,
      fastForward: true,
      autoPlayback: true, // 保存在了localstorage
      autoOrientation: true,
      airplay: true,
    };

    const art = new Artplayer(option);

    art.on('play', () => {
      toast.success('开始播放');
    });
    art.on('ready', () => {
      toast.success('视频加载成功');
    });
    art.on('pause', () => {
      toast('暂停播放');
    });

    // 但是事件上没有销毁, google 仍然可以进行小窗口播放
    return () => {
      art?.destroy(false);
      toast('暂停播放');
    };
  }, [url, id]);

  return <div ref={artRef} className={className}></div>;
}
