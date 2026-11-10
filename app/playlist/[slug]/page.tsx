import PlaylistAuthed from '~components/playlist/PlaylistAuthed';
import { getPlaylistView } from '~lib/api/playlist';

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const playlistId = Number(slug);

  if (!Number.isFinite(playlistId)) {
    return (
      <div className="my-8 text-center text-muted-foreground">
        歌单加载失败，请稍后重试
      </div>
    );
  }

  const initial = await getPlaylistView(playlistId);
  return <PlaylistAuthed playlistId={playlistId} initial={initial} />;
}
