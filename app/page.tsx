import { FaUser } from 'react-icons/fa';
import { getBanners, getRecommendations, searchHot } from '~lib/search';
import Banners from '~app/ui/Banners';
import Playlist from '~app/ui/Playlist';
import HotSongs from './ui/HotSongs';
import RecommendSongs from './ui/RecommendSongs';
import {
  getQrStatus,
  getqrKey,
  loginAnonymous,
  qrCheck,
  qrCreate,
} from '~lib/login';
import { getHotPlayList } from '~lib/playlist';
import { toast } from 'react-toastify';

export default async function Home() {
  await getQrStatus();
  const bannerData = await getBanners();
  const songsHot = await searchHot();
  const PlaylistData = await getHotPlayList();
  const qrStatus = await getQrStatus();
  // 如何检查cookie 的expire
  if (!qrStatus.data.account) {
    await loginAnonymous();
    console.log('login success as vistor');
  } else {
    console.log('登录成功');
  }
  // const recommendSongs = await getRecommendations();

  return (
    <div className="p-2">
      <Banners data={bannerData.banners} />
      <div className="flex items-center my-2 space-x-2">
        <FaUser /> {qrStatus.data.account?.userName}
      </div>
      {/* <RecommendSongs data={recommendSongs.data.dailySongs} /> */}
      <HotSongs data={songsHot.data} />
      <Playlist data={PlaylistData.playlists} />
    </div>
  );
}
