import { getBanners } from '~lib/search';
import { getHomepageBlocks } from '~lib/api/homepage';
import { getFeaturedPlaylists, getNewSongs } from '~lib/api/featured';
import { normalizeHomepageBlocks } from '~lib/homepage-block';
import HomeFeed from '~components/home/HomeFeed';
import FeaturedPage from '~components/home/FeaturedPage';

export const revalidate = 3600;

export default async function Home({
  searchParams
}: {
  searchParams: Promise<{ section?: string | string[] }>;
}) {
  const params = await searchParams;
  const section = Array.isArray(params.section)
    ? params.section[0]
    : params.section;

  if (section === 'featured') {
    const [playlists, songs] = await Promise.all([
      getFeaturedPlaylists(),
      getNewSongs()
    ]);
    return <FeaturedPage playlists={playlists} songs={songs} />;
  }

  const [bannerData, blocks] = await Promise.all([
    getBanners(),
    getHomepageBlocks()
  ]);

  const normalized = normalizeHomepageBlocks(blocks);

  return <HomeFeed banners={bannerData?.banners ?? []} blocks={normalized} />;
}
