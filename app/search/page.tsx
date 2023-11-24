import Search from '~components/Search';
import HotSongs from '~components/HotSongs';
import { searchHotDetail } from '~lib/search';

// TODO: more element
export default function page() {
  const HotSongComponent = async () => {
    const searchHotDetailData = await searchHotDetail();
    const hotData = searchHotDetailData.body as unknown as IHotDetail;

    return <HotSongs data={hotData.data} />;
  };

  return (
    <div>
      {/* <Search /> */}
      <HotSongComponent />
    </div>
  );
}
