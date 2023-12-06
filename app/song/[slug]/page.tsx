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

export default function Page({ params }: { params: Params }) {
  const { slug } = params;

  return <SongPage slug={slug} />;
}
