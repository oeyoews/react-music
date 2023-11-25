import StarPick from '~components/StarPick';
import { useStarPick } from '~lib/hooks';
import { getStarPick } from '~lib/search';

export default async function page() {
  const starpick = await getStarPick('');
  return <StarPick data={starpick} number={24} />;
}
