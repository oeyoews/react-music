import { getAlbumDetail } from '~lib/search';
import Image from 'next/image';
import Link from 'next/link';

export default async function Album({ params }: { params: Params }) {
  const { slug } = params;
  const albumDetail = await getAlbumDetail(Number(slug));
  return (
    <>
      <div className="justify-center items-center flex">
        <Image
          src={albumDetail.album.picUrl}
          width={48}
          height={48}
          alt="img"
          className="rounded-full shadow"
        />
      </div>
      <div className="line-clamp-2">{albumDetail.album.description}</div>
      <ol>
        {albumDetail.songs.map((song) => {
          return (
            <Link
              href={`/song/${song.id}`}
              key={song.id.toString()}
              className="no-underline">
              <li>{song.name}</li>
            </Link>
          );
        })}
      </ol>
    </>
  );
}
