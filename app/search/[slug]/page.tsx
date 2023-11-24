import Link from 'next/link';
import Badge from '~components/Badge';
import { useSearch } from '~lib/hooks';
import toast from 'react-hot-toast';

export default function page({ params }: { params: Params }) {
  const { slug } = params;

  const SearchResult = () => {
    const { data, isLoading } = useSearch(slug);
    if (data.code !== 200) {
      toast.error(`搜索结果: ${data.message}`);
    }

    const vipids = data.result.songs
      ?.filter((song) => song.fee == 1)
      .map((song) => song.id);

    return (
      <div>
        <h2>{decodeURIComponent(slug)}</h2>
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
  };

  return <SearchResult />;
}
