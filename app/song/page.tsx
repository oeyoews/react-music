import { Suspense } from 'react';
import SongPage from '~components/SongComponents';
import Spinner from '~components/Spinner';

export default async function Page() {
  // 注意: vip 也会false, 需要带上localstorage, 可以放在songpage 里面进行判断, 或者使用rsc 传递localstorage to server
  // TOD: check wrong url
  return (
    <Suspense fallback={<Spinner />}>
      <SongPage />
    </Suspense>
  );
}
