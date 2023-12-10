'use client';

import { Howl, Howler } from 'howler';
import { useRef, useEffect, useState } from 'react';
import { useMusicURL } from '~lib/hooks';
import { FaRegCirclePlay, FaRegCirclePause } from 'react-icons/fa6';
import APlayerSkeleton from '~components/ui/AplayerSkeleton';

// TODO: 暂停有杂音 https://github.com/imsyy/SPlayer/blob/b811b00b9f328bf8fcd6b65cc83d02530ec60dbe/src/utils/Player.js#L428
// TODO: 多音频禁止同时播放
function TestPage() {
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  //   const [sound, setSound] = useState<Howl>();
  const apRef = useRef<Howl>();
  const { data: musicData, isLoading: isLoadingURL } =
    useMusicURL('2102054543');

  useEffect(() => {
    const options = {
      src: [musicData?.data[0].url!],
      html5: true,
      pool: 10,
      preload: true,
      rate: 1,
      onend: () => {
        setIsPlaying(false);
      },
      onload: () => {
        setDuration(sound.duration());
      },
    };

    const sound = new Howl(options);

    apRef.current = sound;

    return () => {
      apRef.current?.stop();
      apRef.current?.unload();
    };
  }, [musicData]);

  if (isLoadingURL) {
    return <APlayerSkeleton />;
  }

  const handleToggle = () => {
    if (apRef.current?.playing()) {
      apRef.current.pause();
      setIsPlaying(false);
    } else {
      apRef.current?.pause();
      apRef.current?.play();
      setIsPlaying(true);
    }
  };

  return (
    <div>
      <button onClick={handleToggle} className="">
        {isPlaying ? (
          <FaRegCirclePause className="w-8 h-8" />
        ) : (
          <FaRegCirclePlay className="w-8 h-8" />
        )}
      </button>
    </div>
  );
}

export default TestPage;
