import SectionHeader from '~components/home/SectionHeader';
import PlaylistGrid from '~components/home/PlaylistGrid';

export default function Playlist({ data }: { data: Playlist[] }) {
  const playlists = (data ?? []).map((playlist) => ({
    id: playlist.id,
    name: playlist.name,
    cover: playlist.coverImgUrl,
    playCount: playlist.playCount,
    creator: playlist.creator?.nickname
  }));

  return (
    <section className="not-prose">
      <SectionHeader
        title="热门歌单"
        hint="大家都在听"
        href="/search?searchWord=歌单"
      />
      <PlaylistGrid
        items={playlists}
        emptyText="热门歌单加载失败，请稍后重试"
      />
    </section>
  );
}
