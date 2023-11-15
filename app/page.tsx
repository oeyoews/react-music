import {
  getSongLyric,
  search,
  searchHot,
  getPlayList,
  getMusicURL,
  getMusicURLNEW,
  getbanners,
  getHotPlayList,
  getRecommendations,
} from '~lib/search';
import Image from 'next/image';

export default async function Home() {
  const {
    data: { dailySongs },
  } = await getRecommendations();
  // const { result } = await search('海阔天空');
  const songstop = await searchHot();
  // const { playlist } = await getPlayList(24381616);
  const { banners } = await getbanners();
  const { playlists } = await getHotPlayList();
  // const { data } = await getMusicURL(28798452);
  // const { data } = await getMusicURLNEW(28798452, 'standard');
  // const lyric = await getSongLyric(28798452);

  return (
    <div className='prose mx-auto max-w-4xl p-1'>
      {/* <audio controls>
        <source src={data?.[0].url} type='audio/mpeg' />
      </audio> */}
      {/* {result.songs.map(({ name, artists, id }) => (
        <div key={id}>{name}</div>
      ))} */}

      {/* banner */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-3 not-prose m-2'>
        {banners.map((banner) => (
          <div key={banner.imageUrl}>
            {/* <span>{banner.typeTitle}</span> */}
            <Image
              src={banner.imageUrl}
              alt={banner.typeTitle}
              loading='eager'
              width={300}
              height={300}
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
            <li>
              <div className='flex space-x-2 items-center' key={id}>
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
            <li>
              <div className='flex items-center space-x-2' key={playlist.name}>
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

      <h2>热门歌曲</h2>
      <hr />
      <ol className='columns-1 md:columns-2'>
        {songstop.data.map((song) => (
          <li>
            <div className='flex items-center' key={song.searchWord}>
              <div key={song.searchWord}>{song.searchWord}</div>
              {song.content && <div> -- {song.content}</div>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
