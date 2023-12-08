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

  // 注意: vip 也会false, 需要带上localstorage, 可以放在songpage 里面进行判断, 或者使用rsc 传递localstorage to server
  // TOD: check wrong url
  return <SongPage slug={searchParams.id} />;
}
