'use client';

import { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';
import toast from 'react-hot-toast';

export default function ArtPlayer({
  url,
  className,
  id = url,
  option,
}: {
  url: string;
  className: string;
  option?: any;
  id?: string;
}) {
  const artRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    !url && toast.error('未找到播放源');

    const art = new Artplayer({
      id: id,
      container: artRef.current,
      ...option,
      mute: true,
      url,
      autoplay: true,
      autoMini: true, // if mini, 不会销毁实例
      autoSize: false,
      playbackRate: true,
      aspectRatio: true,
      screenshot: true,
      setting: true,
      hotkey: true,
      pip: true,
      mutex: true, // 无法生效
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
    });

    art.on('play', () => {
      toast.success('开始播放');
    });
    art.on('ready', () => {
      toast.success('视频加载成功');
    });
    art.on('pause', () => {
      toast('暂停播放');
    });

    // swr 轮询更新也会导致artplayer 出错
    // 但是事件上没有销毁, google 仍然可以进行小窗口播放
    return () => {
      if (art && art.destroy) {
        art.destroy(true);
        toast('暂停播放');
      }
    };
  }, [url, id, option]);

  return <div ref={artRef} className={className}></div>;
}
