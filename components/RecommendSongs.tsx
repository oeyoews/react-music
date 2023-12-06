'use client';

import { useEffect, useState } from 'react';
import { getRecommendations } from '~lib/search';
import Link from 'next/link';
import Spinner from './Spinner';
import useSWR from 'swr';

export default function RecommendSongs() {
  const [hasCookie, setHasCookie] = useState(true);

  const { data: recommendations, isLoading } = useSWR('recommendations', () =>
    getRecommendations(localStorage.cookie),
  );

  const data = recommendations?.data?.dailySongs;

  useEffect(() => {
    if (!localStorage.cookie) {
      setHasCookie(false);
    }
  }, []);

  const content = (
    <ul className="columns-1 md:columns-2">
      {hasCookie &&
        data?.slice(0, 20).map(({ name, id, recommendReason }) => (
          <li key={id}>
            <Link href={`/song/${id}`}>
              <div className="flex space-x-2 items-center">
                <div>{name}</div>
                {recommendReason && <div> -- {recommendReason}</div>}
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );

  return (
    <div>
      <h2>每日推荐</h2>
      {!isLoading && content}
      <div className="flex justify-center items-center">
        {hasCookie && isLoading && <Spinner />}
        {!hasCookie && <div className="text-rose-400 font-bold">需要登录</div>}
      </div>
    </div>
  );
}
