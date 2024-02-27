'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { Howl, Howler } from 'howler';
import { useRef, useEffect, useState } from 'react';
import { useArtistData, useMusicURL, useSongDetailData } from '~lib/hooks';
import { FaRegCirclePlay, FaRegCirclePause } from 'react-icons/fa6';
import APlayerSkeleton from '~components/ui/AplayerSkeleton';
import SkeletonAvatar from '~components/ui/SkeletonAvatar';
import formatTime from '~lib/formatTime';

// TODO: check url is validate
// TODO: 支持进度条拖放
// TODO: 支持歌词滚动
// TODO: remove aplayer
// NOTE: 有些歌曲如果没有 cookie, 会加载失败
function ReactMusicPlayer({ id }: { id: string }) {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const apRef = useRef<Howl>();
  const { data: musicData, isLoading: isLoadingURL } = useMusicURL(
    id || '2102054543'
  );
  const { data: songData, isLoading: isLoadingSongData } =
    useSongDetailData(id);

  const arId = songData?.songs[0]?.ar[0].id;
  const { data: artistData, isLoading: isLoadingArtist } = useArtistData(arId!);

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
        // TODO: check duration is valid, such as zero
        setDuration(sound.duration());
        // setCurrentTime(0);
        // setDuration(0);
      },
      onplay: () => {
        const progressInterval = setInterval(() => {
          const currentTime = apRef.current?.seek();
          setCurrentTime(currentTime!);
        }, 50);

        apRef.current?.on('stop', () => {
          clearInterval(progressInterval);
        });
      }
    };

    const sound = new Howl(options);

    apRef.current = sound;

    return () => {
      if (apRef.current) {
        apRef.current.stop();
        apRef.current.unload();
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
      }
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

  const musicName = songData?.songs[0].name;
  const artistName = songData?.songs[0].ar[0].name;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex">
          <div>
            {!isLoadingArtist && artistData?.data ? (
              // add playicon
              <Image
                src={artistData?.data?.artist.cover!}
                unoptimized
                priority
                onClick={handleToggle}
                alt="cover"
                width={100}
                height={100}
                className={clsx(
                  'rounded-full object-cover object-center w-20 h-20 animated not-prose mb-2 cursor-pointer',
                  {
                    rotate: isPlaying
                  }
                )}
              />
            ) : (
              <SkeletonAvatar className="h-20 w-20" />
            )}
          </div>
          <div className="ml-2">
            <span>{musicName}</span>
            <span className="text-gray-400 text-sm ml-2">{artistName}</span>
          </div>
        </div>
        <button onClick={handleToggle} className="">
          {isPlaying ? (
            <FaRegCirclePause className="w-6 h-6" />
          ) : (
            <FaRegCirclePlay className="w-6 h-6" />
          )}
        </button>
      </div>
      <div className="flex text-gray-400 flex-row items-center space-x-1 text-sm">
        <progress value={currentTime} max={duration} id="om-progress" />
        <span className="">{formatTime(currentTime)}</span>
        <span>/</span>
        <span className="">{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default ReactMusicPlayer;
