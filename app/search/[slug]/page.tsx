import { getSongDetail, search } from '~lib/search';
import Link from 'next/link';

export default async function page({ params }: { params: Params }) {
  const { slug } = params;
  const decodeURIComponentSlug = decodeURIComponent(slug);

  // TODO: 封装lib, ui components
  // BUG: cros 问题 undici
  // 在page 里面也会有问题
  await getSongDetail(slug);
  // const vip = privileges[0].fee === 1 ? true : false;

  const searchResult = await search(decodeURIComponentSlug);

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
                    {/* <sup>{vip ? 'VIP' : ''}</sup> */}
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
