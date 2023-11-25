import Link from 'next/link';
import Badge from '~components/Badge';
import { search } from '~lib/search';

export default async function page({ params }: { params: Params }) {
  const { slug } = params;
  const keywords = decodeURIComponent(slug);

  try {
    const data = await search(keywords);

    const vipids = data.result?.songs
      ?.filter((song) => song.fee == 1)
      .map((song) => song.id);

    return (
      <div>
        <h2>{keywords}</h2>
        <ol className="columns-1 md:columns-2">
          {data.result.songs?.map((song) => {
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
  } catch (e) {
    // @ts-ignore
    return <div className="text-center text-red-400">{e.message}</div>;
  }
}
