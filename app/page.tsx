import Image from 'next/image';
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
import { getQrStatus, getqrKey, qrCreate } from '~lib/login';

export default async function Home() {
  const bannerData = await getBanners();
  // const recommendSongs = await getRecommendations();
  const songsHot = await searchHot();
  const PlaylistData = await getHotPlayList();
  const qrKey = await getqrKey();
  const qrCode = await qrCreate(qrKey.data.unikey);
  const qrstatus = await getQrStatus();

  return (
    <div className="prose mx-auto max-w-4xl p-2 prose-zinc">
      <div>
        status: {qrstatus.data.account.id} {qrstatus.data.account.userName}
      </div>
      <Image src={qrCode.data.qrimg} alt="login" width={225} height={225} />
      <Banners data={bannerData.banners} />
      {/* <RecommendSongs data={recommendSongs.data.dailySongs} /> */}
      <HotSongs data={songsHot.data} />
      <Playlist data={PlaylistData.playlists} />
    </div>
  );
}
