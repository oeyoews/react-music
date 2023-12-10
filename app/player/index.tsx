'use client';

import Image from 'next/image';
import { Howl, Howler } from 'howler';
import { useRef, useEffect, useState } from 'react';
import { useArtistData, useMusicURL, useSongDetailData } from '~lib/hooks';
import { FaRegCirclePlay, FaRegCirclePause } from 'react-icons/fa6';
import APlayerSkeleton from '~components/ui/AplayerSkeleton';
import SkeletonAvatar from '~components/ui/SkeletonAvatar';

// TODO: check url is valid
function ReactMusicPlayer({ id }: { id: string }) {
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  //   const [sound, setSound] = useState<Howl>();
  const apRef = useRef<Howl>();
  const { data: musicData, isLoading: isLoadingURL } = useMusicURL(
    id || '2102054543',
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
      name: {songData?.songs[0].name}
      artist: {songData?.songs[0].ar[0].name}
      {/* <SkeletonAvatar /> */}
      <Image
        src={artistData?.data?.artist.cover!}
        alt="cover"
        width={100}
        height={100}
        className="rounded-full w-24 h-24"
      />
      {Math.floor(duration / 60)}:{Math.floor(duration % 60)}
      {/* volume */}
      {/* {Howler.volume(0.1)} */}
    </div>
  );
}

export default ReactMusicPlayer;
