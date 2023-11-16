import { FaUser } from 'react-icons/fa';
import { getBanners, searchHot } from '~lib/search';
import Banners from '~app/ui/Banners';
import Playlist from '~app/ui/Playlist';
import HotSongs from './ui/HotSongs';
import RecommendSongs from './ui/RecommendSongs';
import { getQrStatus, getqrKey, qrCheck, qrCreate } from '~lib/login';
import { getHotPlayList } from '~lib/playlist';

export default async function Home() {
  await getQrStatus();
  const bannerData = await getBanners();
  const songsHot = await searchHot();
  const PlaylistData = await getHotPlayList();
  const qrStatus = await getQrStatus();

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
