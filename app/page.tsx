import {
  getBanners,
  getHotPlayList,
  getRecommendations,
  searchHot,
} from '~lib/search';
import Banners from '~app/ui/Banners';
import Playlist from '~app/ui/Playlist';
import HotSongs from './ui/HotSongs';
import RecommendSongs from './ui/RecommendSongs';

export default async function Home() {
  const bannerData = await getBanners();
  const recommendSongs = await getRecommendations();
  const songsHot = await searchHot();
  const PlaylistData = await getHotPlayList();

  return (
    <div className="prose mx-auto max-w-4xl p-1">
      <Banners data={bannerData.banners} />
      {songsHot && <RecommendSongs data={recommendSongs.data.dailySongs} />}
      <HotSongs data={songsHot.data} />
      <Playlist data={PlaylistData.playlists} />
    </div>
  );
}
