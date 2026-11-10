import SectionHeader from '~components/home/SectionHeader';
import PlaylistGrid from '~components/home/PlaylistGrid';

/**
 * 推荐歌单。
 * /personalized 不需要登录，数据由首页服务端取好传进来，
 * 这样首屏不用等客户端水合后再发一次请求。
 */
export default function PlaylistPersonalized({
  data
}: {
  data: PlaylistPersonalized[];
}) {
  const playlists = (data ?? []).map((playlist) => ({
    id: playlist.id,
    name: playlist.name,
    cover: playlist.picUrl,
    playCount: playlist.playCount,
    hint: playlist.copywriter
  }));

  return (
    <section className="not-prose">
      <SectionHeader title="推荐歌单" hint="根据你的口味推荐" />
      <PlaylistGrid
        items={playlists}
        emptyText="推荐歌单加载失败，请稍后重试"
      />
    </section>
  );
}
