import MV from '~components/Video/MV';
import { getMvFirst, getMvRCMD } from '~lib/mv';

export default async function MVPage() {
  const mvrcmd = await getMvRCMD();
  const mvfirst = await getMvFirst();

  return (
    <div className="p-2 mb-16">
      {mvrcmd && <MV data={mvfirst.body.data} total={16} />}
    </div>
  );
}
