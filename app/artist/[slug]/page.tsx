'use client';

import { useArtistData } from '~lib/hooks';
import Image from 'next/image';
import Spinner from '~components/Spinner';

export default function page({ params }: { params: any }) {
  const { slug } = params;

  const ArtistData = () => {
    const { data, isLoading } = useArtistData(slug);
    const artist = data?.data.artist;

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
              className="rounded-full"
            />
          </div>
        )}
        <div className="font-bold">{artist?.name}</div>
        <p>{artist?.briefDesc}</p>
      </>
    );
  };

  return <ArtistData />;
}
