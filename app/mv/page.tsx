import MV from '~components/Video/MV';
import { getMvRCMD } from '~lib/mv';

export default async function MVPage() {
  const mvrcmd = await getMvRCMD();

  return (
    <div className="p-2 mb-16">
      <MV data={mvrcmd} />
    </div>
  );
}
