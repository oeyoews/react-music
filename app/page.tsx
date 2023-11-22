import { getBanners, searchHotDetail } from '~lib/search';
import Banners from '~components/Banners';
import Playlist from '~components/Playlist';
import HotSongs from '~components/HotSongs';
import RecommendSongs from '~components/RecommendSongs';
import { getHotPlayList, getPlayListPersonalized } from '~lib/api/playlist';
import Announcement from '~components/Announcement';
import StarPick from '~components/StarPick';
import MV from '~components/Video/MV';
import { getMvFirst, getMvRCMD, getPersonalizedVideo } from '~lib/mv';
import PlaylistPersonalized from '~components/PlaylistPersonalized';

export const revalidate = 3600;

export default async function Home() {
  const bannerData = await getBanners();
  const songsHot = await searchHotDetail();
  const PlaylistData = await getHotPlayList();
  const mvrcmd = await getMvRCMD();

  return (
    <div className="p-2 mb-16">
      <Announcement
        text="维护中..."
        store={true}
        icon={'🎉'}
        position="top-center"
      />
      <Banners data={bannerData.banners} />

      {/* 构建时有渲染问题 */}
      <StarPick />
      <RecommendSongs />
      <PlaylistPersonalized />
      <Playlist data={PlaylistData.playlists} />
      <HotSongs data={songsHot.data} />
      <MV data={mvrcmd} />
    </div>
  );
}
