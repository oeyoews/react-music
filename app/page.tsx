import Banners from '~components/Banners';
import Playlist from '~components/Playlist';
import RecommendSongs from '~components/RecommendSongs';
import Announcement from '~components/Announcement';
import StarPick from '~components/StarPick';
import PlaylistPersonalized from '~components/PlaylistPersonalized';
import { customfetch as fetch } from '~lib/fetchData';

export const revalidate = 3600;

export default async function Home() {
  const personalizedPlaylistData = await fetch({ url: '/api/personalized' });

  const starpickData = await fetch({
    url: '/api/starpick',
  });

  const bannerData = await fetch({ url: '/api/banner', params: { type: 1 } });

  const topPlaylistData = await fetch({ url: '/api/top_playlist' });

  return (
    <div className="p-2 mb-16">
      <Announcement
        text="重构中..."
        store={true}
        icon={'🎉'}
        position="top-center"
      />
      <Banners data={bannerData} />

      <StarPick data={starpickData} />
      <RecommendSongs />
      <PlaylistPersonalized data={personalizedPlaylistData} />
      <Playlist data={topPlaylistData.playlists} />
    </div>
  );
}
