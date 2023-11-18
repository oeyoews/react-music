'use client';

import { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';
import artplayerPluginControl from 'artplayer-plugin-control';

export default function ArtPlayer({
  url,
  className,
  id = url,
  option,
  getInstance,
  ...rest
}: {
  url: string;
  className: string;
  id?: string;
  option?: any;
  getInstance?: (art: Artplayer) => void;
}) {
  const artRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const art = new Artplayer({
      id: id,
      ...option,
      mute: true,
      url,
      autoplay: true,
      container: artRef.current,
      autoSize: true,
      autoMini: true,
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
      plugins: [artplayerPluginControl()],
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
      controls: [
        {
          position: 'right',
          html: '<button type="">Switch UI</button>',
          click: function () {
            const { enable } = art.plugins.artplayerPluginControl;
            art.plugins.artplayerPluginControl.enable = !enable;
          },
        },
      ],
    });

    {
      /* 会跑两次 */
    }
    if (getInstance && typeof getInstance === 'function') {
      getInstance(art);
    }

    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
  }, [getInstance, option, url]);

  return <div ref={artRef} {...rest} className={className}></div>;
}
