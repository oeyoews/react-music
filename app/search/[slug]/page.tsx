import { search } from '~lib/search';
import Link from 'next/link';
import Image from 'next/image';

export default async function page({ params }: { params: Params }) {
  const { slug } = params;
  const searchResult = await search(decodeURIComponent(slug));
  return (
    <div>
      <h2>{decodeURIComponent(slug)}</h2>
      <ol className="columns-1 md:columns-2">
        {searchResult.result.songs.map((song) => {
          return (
            <li className="" key={song.id}>
              <Link href={`/song/${song.id}`}>
                <div className="flex">
                  {/* <Image
                    src={song.artists[0].img1v1Url}
                    width={48}
                    height={48}
                    alt={song.artists[0].name}
                    className="rounded-full"
                  /> */}
                  <div>
                    {song.name} -- {song.artists[0].name}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
