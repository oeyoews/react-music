import { Metadata } from 'next';
import Search from '~app/ui/Search';
import { searchDefault } from '~lib/search';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search for songs, artists, or albums',
};

export default async function page() {
  const { data } = await searchDefault();
  return <Search searchWord={data.showKeyword} />;
}
