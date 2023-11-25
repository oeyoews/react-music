import Banners from '~components/Banners';
import Playlist from '~components/Playlist';
import RecommendSongs from '~components/RecommendSongs';
import Announcement from '~components/Announcement';
import StarPick from '~components/StarPick';
import PlaylistPersonalized from '~components/PlaylistPersonalized';

export const revalidate = 3600;

export default async function Home() {
  const baseURL = process.env.MUSIC_API;

  const personalizedPlaylistRes = await fetch(baseURL + '/api/personalized');
  const personalizedPlaylistData = await personalizedPlaylistRes.json();

  const starpickRes = await fetch(baseURL + '/api/starpick');
  const starpickData = await starpickRes.json();

  const bannerres = await fetch('http://localhost:3000/api/banner');
  const bannerdata = await bannerres.json();

  const top_playlist_res = await fetch(
    'http://localhost:3000/api/top_playlist',
  );
  const top_playlist_data = await top_playlist_res.json();

  return (
    <div className="p-2 mb-16">
      <Announcement
        text="重构中..."
        store={true}
        icon={'🎉'}
        position="top-center"
      />
      <Banners data={bannerdata.body.banners} />

      <StarPick data={starpickData.body} />
      <RecommendSongs />
      <PlaylistPersonalized data={personalizedPlaylistData.body} />
      <Playlist data={top_playlist_data.body.playlists} />
    </div>
  );
}
