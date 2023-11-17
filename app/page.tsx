import { getBanners, getRecommendations, searchHot } from '~lib/search';
import Banners from '~app/ui/Banners';
import Playlist from '~app/ui/Playlist';
import HotSongs from './ui/HotSongs';
import RecommendSongs from './ui/RecommendSongs';
import {
  getLoginStatus,
  getqrKey,
  loginAnonymous,
  qrCheck,
  qrCreate,
} from '~lib/login';
import { getHotPlayList } from '~lib/playlist';
import Announcement from './ui/Announcement';

export const revalidate = 3600;

export default async function Home() {
  await getLoginStatus();
  const bannerData = await getBanners();
  const songsHot = await searchHot();
  const PlaylistData = await getHotPlayList();
  // const loginStatus = await getLoginStatus();
  // 如何检查cookie 的expire
  // if (!qrStatus.data.account) {
  //   await loginAnonymous();
  //   console.log('login success as vistor');
  // } else {
  //   console.log('登录成功');
  // }

  return (
    <div className="p-2">
      <Announcement text="开发中..." />
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
