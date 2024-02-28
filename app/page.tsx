import { getBanners } from '~lib/search';
import Banners from '~components/Banners';
import Playlist from '~components/Playlist';
import RecommendSongs from '~components/RecommendSongs';
import { getHotPlayList } from '~lib/api/playlist';
import StarPick from '~components/StarPick';
import PlaylistPersonalized from '~components/PlaylistPersonalized';
import { LoginAnonymous } from '~components/Login/anonymous';
export const revalidate = 3600;

export default async function Home() {
  const bannerData = await getBanners();
  const PlaylistData = await getHotPlayList();

  return (
    <div className="p-2 mb-16">
      <LoginAnonymous />
      <Banners data={bannerData.banners} />
      <Playlist data={PlaylistData.playlists} />
      <RecommendSongs />
      <PlaylistPersonalized />
      <StarPick />
    </div>
  );
}
