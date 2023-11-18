import { search } from '~lib/search';
import Link from 'next/link';

export default async function page({ params }: { params: Params }) {
  const { slug } = params;
  const searchResult = await search(decodeURIComponent(slug));
  // TODO: 有可能没有搜索结果
  return (
    <div>
      <h2>{decodeURIComponent(slug)}</h2>
      <ol className="columns-1 md:columns-2">
        {searchResult.result.songs?.map((song) => {
          return (
            <li className="" key={song.id}>
              <Link href={`/song/${song.id}`}>
                <div className="flex">
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
