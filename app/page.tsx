import {
  searchHot,
  getbanners,
  getHotPlayList,
  getRecommendations,
} from '~lib/search';
import Image from 'next/image';

export default async function Home() {
  const {
    data: { dailySongs },
  } = await getRecommendations();
  const songstop = await searchHot();
  const { banners } = await getbanners();
  // const { playlists } = await getHotPlayList();

  return (
    <div className='prose mx-auto max-w-4xl p-1'>
      {/* banner */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-3 not-prose m-2'>
        {banners.map((banner) => (
          <div key={banner.imageUrl}>
            {/* <span>{banner.typeTitle}</span> */}
            <Image
              src={banner.imageUrl}
              alt={banner.typeTitle}
              priority={true}
              width={1080}
              height={480}
              className='rounded w-full'
            />
          </div>
        ))}
      </div>

      {/* recommend songs */}
      <div className='mx-1'>
        <h2>推荐歌曲</h2>
        <hr />
        <ol className='columns-1 md:columns-2'>
          {dailySongs.map(({ name, id, recommendReason }) => (
            <li key={id}>
              <div className='flex space-x-2 items-center'>
                <div>{name}</div>
                <div className=''>
                  {recommendReason && <div> -- {recommendReason}</div>}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className='mx-1'>
        <h2>热门歌单</h2>
        <hr />
        <ol className='space-y-2 columns-1 md:columns-2'>
          {playlists.map((playlist) => (
            <li key={playlist.name}>
              <div className='flex items-center space-x-2'>
                <div className='not-prose'>
                  <Image
                    src={playlist.coverImgUrl}
                    alt={playlist.name}
                    width={22}
                    height={22}
                    className='rounded-full'
                  />
                </div>
                <div>{playlist.name}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* hot songs */}
      {/* <div>
        <h2>热门歌曲</h2>
        <hr />
        <ol className='columns-1 md:columns-2'>
          {songstop.data.map((song) => (
            <li key={song.searchWord}>
              <div className='flex items-center'>
                <div key={song.searchWord}>{song.searchWord}</div>
                {song.content && <div> -- {song.content}</div>}
              </div>
            </li>
          ))}
        </ol>
      </div> */}
    </div>
  );
}
