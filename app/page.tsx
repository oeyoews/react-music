import { getBanners, searchHot } from '~lib/search';
import Banners from '~app/ui/Banners';
import Playlist from '~app/ui/Playlist';
import HotSongs from './ui/HotSongs';
import RecommendSongs from './ui/RecommendSongs';
import { getHotPlayList } from '~lib/playlist';
import Announcement from './ui/Announcement';

export const revalidate = 3600;

export default async function Home() {
  const bannerData = await getBanners();
  const songsHot = await searchHot();
  const PlaylistData = await getHotPlayList();

  return (
    <div className="p-2">
      {/* <Announcement text="完善中..." /> */}
      <Banners data={bannerData.banners} />
      <RecommendSongs />
      {/* <div className="flex items-center my-2 space-x-2">
        <FaUser /> {loginStatus.data.account?.userName}
      </div> */}
      <HotSongs data={songsHot.data} />
      <Playlist data={PlaylistData.playlists} />
    </div>
  );
}
