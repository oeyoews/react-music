import EmptyHint from './EmptyHint';
import PlaylistCard, { type PlaylistCardData } from './PlaylistCard';

export default function PlaylistGrid({
  items,
  emptyText = '暂无歌单',
  limit = 12
}: {
  items: PlaylistCardData[];
  emptyText?: string;
  limit?: number;
}) {
  if (items.length === 0) {
    return <EmptyHint text={emptyText} />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {items.slice(0, limit).map((item) => (
        <PlaylistCard key={item.id} data={item} />
      ))}
    </div>
  );
}
