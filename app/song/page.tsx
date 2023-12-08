import { Suspense } from 'react';
import SongPage from '~components/SongComponents';

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // 注意: vip 也会false, 需要带上localstorage, 可以放在songpage 里面进行判断, 或者使用rsc 传递localstorage to server
  // TOD: check wrong url
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SongPage id={searchParams.id} />;
    </Suspense>
  );
}
