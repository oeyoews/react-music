import app from 'NeteaseCloudMusicApi';
import Banners from '~components/Banners';
import Playlist from '~components/Playlist';
import RecommendSongs from '~components/RecommendSongs';
import Announcement from '~components/Announcement';
import StarPick from '~components/StarPick';
import PlaylistPersonalized from '~components/PlaylistPersonalized';
import {getBanners} from '~lib/search';

export const revalidate = 3600;

export default async function Home() {

  const personalizedData = await app.personalized({
    limit: 10,
  });
  const personalizedPlaylist =
    personalizedData.body as unknown as IPlaylistPersonalized;
  // @ts-ignore
    const starpickData= await app.starpick_comments_summary()

  // hot playlist
  const playlistData = await app.top_playlist({
    limit: 10,
  });
  const playlist = playlistData.body as unknown as IPlaylist;

  const bannersData = await getBanners();
  const banners = (await bannersData.body) as unknown as IBanner;

  return (
    <div className="p-2 mb-16">
      <Announcement
        text="重构中..."
        store={true}
        icon={'🎉'}
        position="top-center"
      />
      <Banners data={banners.banners} />

      <StarPick data={starpickData.body}/>
      <RecommendSongs />
      <PlaylistPersonalized data={personalizedPlaylist} />
      <Playlist data={playlist.playlists} />
    </div>
  );
}
