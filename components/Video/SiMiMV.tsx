import { useSiMiMV } from '~lib/hooks';
import Spinner from '~components/Spinner';
import MV from './MV';

export default function SiMiMV({ mvId }: { mvId: Id }) {
  const { data, isLoading } = useSiMiMV(mvId);
  return (
    <div className="my-4">
      {isLoading ? <Spinner /> : <MV data={data?.mvs!} />}
    </div>
  );
}
