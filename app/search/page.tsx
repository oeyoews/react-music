import { Metadata } from 'next';
import Search from '~app/ui/Search';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search for songs, artists, or albums',
};

export const generatestaticParams = async () => {
  return [
    {
      slug: 'search',
    },
  ];
};

export default function page() {
  return <Search />;
}
