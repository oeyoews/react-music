import Search from '~components/Search';
import HotSongs from '~components/HotSongs';
import { searchHotDetail } from '~lib/search';

export default function page() {
  // const HotSongComponent = async () => {
  //   const searchHotDetailData = await searchHotDetail();
  //   const hotData = searchHotDetailData as unknown as IHotDetail;

  //   return <HotSongs data={hotData.data} />;
  // };

  return (
    <div>
      <Search />
      {/* <HotSongComponent /> */}
    </div>
  );
}
