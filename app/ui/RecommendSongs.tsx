'use client';

import { useEffect, useState } from 'react';
import { getRecommendations } from '~lib/search';
import Link from 'next/link';

export default function RecommendSongs() {
  const [data, setData] = useState<DailySong[]>();
  const [hasCookie, setHasCookie] = useState(true);
  useEffect(() => {
    if (!localStorage.cookie) {
      setHasCookie(false);
      // return;
    }
    getRecommendations(localStorage.cookie).then((recommendSongs) => {
      setData(recommendSongs.data.dailySongs);
    });
  }, []);

  return (
    <div>
      <h2>每日推荐</h2>
      <hr />
      <ol className="columns-1 md:columns-2">
        {/* TODO: 缓存 */}
        {!hasCookie && data ? (
          data.map(({ name, id, recommendReason }) => (
            <li key={id}>
              <div className="flex space-x-2 items-center">
                <div>{name}</div>
                <Link href={`/song/${id}`}>
                  {recommendReason && <div> -- {recommendReason}</div>}
                </Link>
              </div>
            </li>
          ))
        ) : (
          <Link href="/login">需要登录</Link>
        )}
      </ol>
    </div>
  );
}
