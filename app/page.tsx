import { getBanners, searchHotDetail } from '~lib/search';
import Banners from '~app/ui/Banners';
import Playlist from '~app/ui/Playlist';
import HotSongs from './ui/HotSongs';
import RecommendSongs from './ui/RecommendSongs';
import { getHotPlayList } from '~lib/playlist';
import Announcement from './ui/Announcement';
import StarPick from './ui/StarPick';
import MVFirst from './ui/Video/MVFirst';
import { getMvFirst } from '~lib/mv';

export const revalidate = 3600;

export default async function Home() {
  const bannerData = await getBanners();
  const songsHot = await searchHotDetail();
  const PlaylistData = await getHotPlayList();
  const mvFirst = await getMvFirst();

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
      <HotSongs data={songsHot.data} />
      <Playlist data={PlaylistData.playlists} />
      <MVFirst mvFirst={mvFirst} />
    </div>
  );
}
