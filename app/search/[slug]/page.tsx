import { getSongDetail, search } from '~lib/search';
import Link from 'next/link';
import Badge from '~app/ui/Badge';

export default async function page({ params }: { params: Params }) {
  const { slug } = params;
  const decodeURIComponentSlug = decodeURIComponent(slug);

  // TODO: 封装lib, ui components
  const searchResult = await search(decodeURIComponentSlug);
  const vipids = searchResult.result.songs
    .filter((song) => song.fee == 1)
    .map((song) => song.id);

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
                  {song.name} -- {song.artists[0].name}
                  {vipids.includes(song.id) ? (
                    <div>
                      <Badge
                        text={'VIP'}
                        className="text-red-500 mx-2 font-serif"
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
