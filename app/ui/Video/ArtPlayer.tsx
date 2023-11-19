'use client';

import { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';
import toast from 'react-hot-toast';
// import artplayerPluginControl from 'artplayer-plugin-control';

export default function ArtPlayer({
  url,
  className,
  id = url,
  option,
  // getInstance,
  ...rest
}: {
  url: string;
  className: string;
  id?: string;
  option?: any;
  // getInstance?: (art: Artplayer) => void;
}) {
  const artRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if (!url) return;

    const art = new Artplayer({
      id: id,
      ...option,
      mute: true,
      url,
      container: artRef.current,
      autoplay: false,
      autoMini: false, // if mini, 不会销毁实例
      autoSize: true,
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
      // useSSR: true,
      playsInline: true,
      // plugins: [artplayerPluginControl()],
      lock: true,
      fastForward: true,
      thumbnails: {
        // url: '/assets/sample/thumbnails.png',
        number: 60,
        column: 10,
      },
      autoPlayback: true, // 保存在了localstorage
      autoOrientation: true,
      airplay: true,
      // controls: [
      //   {
      //     position: 'right',
      //     html: '<button type="">Switch UI</button>',
      //     click: function () {
      //       const { enable } = art.plugins.artplayerPluginControl;
      //       art.plugins.artplayerPluginControl.enable = !enable;
      //     },
      //   },
      // ],
    });

    // getinstance 会导致死循环
    // if (getInstance && typeof getInstance === 'function') {
    //   getInstance(art);
    // }

    art.on('play', () => {
      toast.success('开始播放');
    });
    art.on('ready', () => {
      toast.success('视频加载成功');
    });
    art.on('pause', () => {
      toast('暂停播放');
    });

    return () => {
      // 但是事件上没有销毁, google 仍然可以进行小窗口播放
      if (art && art.destroy) {
        art.destroy(true);
        toast('暂停播放');
      }
    };
  }, [option, url, id]);

  return <div ref={artRef} {...rest} className={className}></div>;
}
