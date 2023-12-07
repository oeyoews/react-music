import SidebarSearchMusic from '~components/SidebarSearchMusic';
import SongPage from '~components/SongComponents';
import { getBanners } from '~lib/search';

export async function generateStaticParams() {
  const bannerData = await getBanners();
  return bannerData.banners.map((banner) => {
    return {
      slug: banner.targetId.toString(),
    };
  });
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  if (!searchParams.id) return <SidebarSearchMusic />;
  return <SongPage slug={searchParams.id} />;
}
