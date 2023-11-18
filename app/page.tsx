import { getBanners, getStarPick, searchHot } from '~lib/search';
import Banners from '~app/ui/Banners';
import Playlist from '~app/ui/Playlist';
import HotSongs from './ui/HotSongs';
import RecommendSongs from './ui/RecommendSongs';
import { getHotPlayList } from '~lib/playlist';
import Announcement from './ui/Announcement';
import StarPick from './ui/StarPick';

export const revalidate = 3600;

export default async function Home() {
  const bannerData = await getBanners();
  const songsHot = await searchHot();
  const PlaylistData = await getHotPlayList();

  return (
    <div className="p-2">
      <Announcement text="完善中..." />
      <Banners data={bannerData.banners} />
      <StarPick />
      <RecommendSongs />
      <HotSongs data={songsHot.data} />
      <Playlist data={PlaylistData.playlists} />
    </div>
  );
}
