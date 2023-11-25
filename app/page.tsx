import Banners from '~components/Banners';
import Playlist from '~components/Playlist';
import RecommendSongs from '~components/RecommendSongs';
import StarPick from '~components/StarPick';
import { getBanner, getStarPick } from '~lib/search';
import { getPlayListPersonalized, getTopPlayList } from '~lib/api/playlist';
import PlaylistPersonalized from '~components/PlaylistPersonalized';

export const revalidate = 3600;

export default async function Home() {
  const personalizedPlaylistData = await getPlayListPersonalized('');
  const starpickData = await getStarPick();
  const bannerData = await getBanner();
  const topPlaylistData = await getTopPlayList();

  return (
    <div className="p-2 mb-16">
      <Banners data={bannerData} />
      <StarPick data={starpickData} />
      <RecommendSongs />
      <Playlist data={topPlaylistData.playlists} />
      <PlaylistPersonalized data={personalizedPlaylistData} />
    </div>
  );
}
