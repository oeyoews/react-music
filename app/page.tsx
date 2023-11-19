import {
  getBanners,
  getSongComment,
  getSongDetail,
  searchHot,
  searchHotDetail,
} from '~lib/search';
import Banners from '~app/ui/Banners';
import Playlist from '~app/ui/Playlist';
import HotSongs from './ui/HotSongs';
import RecommendSongs from './ui/RecommendSongs';
import { getHotPlayList } from '~lib/playlist';
import Announcement from './ui/Announcement';
import StarPick from './ui/StarPick';
import MVFirst from './ui/Video/MVFirst';
import { getMvFirst, getPersonalizedMv } from '~lib/mv';
import Link from 'next/link';
import Image from 'next/image';
import { getHomePage } from '~lib/homepage';
import HomePage from './ui/HomePage';

export const revalidate = 3600;

export default async function Home() {
  const bannerData = await getBanners();
  const songsHot = await searchHotDetail();
  const PlaylistData = await getHotPlayList();
  const mvFirst = await getMvFirst();
  const personalizeMv = await getPersonalizedMv();
  const homepage = await getHomePage();

  return (
    <div className="p-2 mb-16">
      <Announcement text="完善中..." store={true} />
      <Banners data={bannerData.banners} />
      {/* <HomePage data={homepage.data} /> */}
      {/* <Carousel data={bannerData.banners} /> */}
      {/* {process.env.NODE_ENV === 'development' && <StarPick />} */}
      <StarPick />
      <RecommendSongs />
      <HotSongs data={songsHot.data} />
      <Playlist data={PlaylistData.playlists} />
      <MVFirst mvFirst={mvFirst} />

      {/* <h2>推荐MV</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-8 my-6">
        {personalizeMv.result.map((mv) => (
          <div key={mv.id}>
            <div className="flex justify-between items-center my-2">
              <div>{mv.copywriter}</div>
              <div>
                {mv.playCount > 10000
                  ? `${(mv.playCount / 10000).toFixed(1)}万`
                  : mv.playCount}
              </div>
            </div>
            <Link href={`/video/${mv.id}`} title="点击进入MV">
              <Image
                src={mv.picUrl}
                alt={mv.name}
                width={256}
                height={144}
                className="rounded-md shadow m-0 w-full hover:scale-105 duration-500 transition-all"
              />
            </Link>
          </div>
        ))}
      </div> */}
    </div>
  );
}
