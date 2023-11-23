'use client';

import Link from 'next/link';
import { useArtistData } from '~lib/hooks';
import Image from 'next/image';
import Spinner from '~components/Spinner';

export default function page({ params }: { params: any }) {
  const { slug } = params;

  const ArtistData = () => {
    const { data: artistdata, isLoading } = useArtistData(slug);
    const artist = artistdata?.data.artist;
    const videoCount = artistdata?.data.videoCount;

    return (
      <>
        {isLoading && <Spinner />}
        {!isLoading && (
          <div className="flex justify-center items-center">
            <Image
              src={artist?.avatar!}
              alt="img"
              width={256}
              height={256}
              className="rounded-full shadow-lg"
            />
          </div>
        )}
        <div className="font-bold">{artist?.name}</div>
        {/* <div>video: {videoCount}</div> */}
        <p>{artist?.briefDesc}</p>
      </>
    );
  };

  return <ArtistData />;
}
