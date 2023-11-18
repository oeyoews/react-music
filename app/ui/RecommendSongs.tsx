'use client';

import { useEffect, useState } from 'react';
import { getRecommendations } from '~lib/search';
import Link from 'next/link';
import Spinner from './Spinner';

export default function RecommendSongs() {
  const [data, setData] = useState<DailySong[]>();
  const [hasCookie, setHasCookie] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.cookie) {
      setHasCookie(false);
    }
    getRecommendations(localStorage.cookie).then((recommendSongs) => {
      setData(recommendSongs.data?.dailySongs);
      setLoading(false);
    });
  }, []);

  const content = (
    <ol className="columns-1 md:columns-2">
      {hasCookie &&
        data?.map(({ name, id, recommendReason }) => (
          <li key={id}>
            <Link href={`/song/${id}`}>
              <div className="flex space-x-2 items-center">
                <div>{name}</div>
                {recommendReason && <div> -- {recommendReason}</div>}
              </div>
            </Link>
          </li>
        ))}
    </ol>
  );

  return (
    <div>
      <h2>每日推荐</h2>
      {content}
      <div className="flex justify-center items-center">
        {hasCookie && loading && <Spinner />}
        {!hasCookie && <div className="text-rose-400 font-bold">需要登录</div>}
      </div>
    </div>
  );
}
