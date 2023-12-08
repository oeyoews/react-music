import SidebarSearchMusic from '~components/SidebarSearchMusic';
import SongPage from '~components/SongComponents';
import { checkSong } from '~lib/search';

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  if (!searchParams.id)
    return (
      <div>
        <SidebarSearchMusic />
      </div>
    );
  const isVaildateSong = await checkSong(searchParams.id);
  if (!isVaildateSong.success) {
    return (
      <>
        <div className="absolute mx-auto top-1/2 left-1/2 -translate-x-1/2 text-rose-500">
          无效的id: {searchParams.id}
        </div>
        <SidebarSearchMusic />
      </>
    );
  }

  return <SongPage slug={searchParams.id} />;
}
