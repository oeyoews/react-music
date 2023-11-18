'use client';

import { useEffect, useState } from 'react';
import { getRecommendations } from '~lib/search';
import Link from 'next/link';

export default function RecommendSongs() {
  const [data, setData] = useState<DailySong[]>();
  const [hasCookie, setHasCookie] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.cookie) {
      setHasCookie(false);
      // return;
    }
    getRecommendations(localStorage.cookie).then((recommendSongs) => {
      setData(recommendSongs.data.dailySongs);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h2>每日推荐</h2>
      <ol className="columns-1 md:columns-2">
        {/* TODO: 缓存 */}
        {hasCookie && data ? (
          data.map(({ name, id, recommendReason }) => (
            <li key={id}>
              <Link href={`/song/${id}`}>
                <div className="flex space-x-2 items-center">
                  <div>{name}</div>
                  {recommendReason && <div> -- {recommendReason}</div>}
                </div>
              </Link>
            </li>
          ))
        ) : (
          <div>
            {loading && (
              <div className="h-24 bg-neutral-100 rounded animate-pulse"></div>
            )}
            {!hasCookie && <div>需要登录</div>}
          </div>
        )}
      </ol>
    </div>
  );
}
