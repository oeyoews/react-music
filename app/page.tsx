import { getBanners } from '~lib/search';
import Banners from '~components/Banners';
import Playlist from '~components/Playlist';
import RecommendSongs from '~components/RecommendSongs';
import { getHotPlayList } from '~lib/api/playlist';
import Announcement from '~components/Announcement';
import StarPick from '~components/StarPick';
import PlaylistPersonalized from '~components/PlaylistPersonalized';

export const revalidate = 3600;

export default async function Home() {
  const bannerData = await getBanners();
  const PlaylistData = await getHotPlayList();

  return (
    <div className="p-2 mb-16">
      {/* <Announcement
        text="重构中..."
        store={true}
        icon={'🎉'}
        position="top-center"
      /> */}
      <Banners data={bannerData.banners} />
      <RecommendSongs />
      <PlaylistPersonalized />
      <Playlist data={PlaylistData.playlists} />
      <StarPick />
    </div>
  );
}
