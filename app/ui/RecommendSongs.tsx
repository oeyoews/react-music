'use client';

import { useEffect, useState } from 'react';
import { getRecommendations } from '~lib/search';

export default function RecommendSongs() {
  const [data, setData] = useState<DailySong[]>();
  useEffect(() => {
    if (!localStorage.cookie) return;
    getRecommendations().then((recommendSongs) => {
      setData(recommendSongs.data.dailySongs);
    });
  }, []);

  return (
    <div>
      <h2>每日推荐</h2>
      <hr />
      <ol className="columns-1 md:columns-2">
        {data ? (
          data.map(({ name, id, recommendReason }) => (
            <li key={id}>
              <div className="flex space-x-2 items-center">
                <div>{name}</div>
                <div className="">
                  {recommendReason && <div> -- {recommendReason}</div>}
                </div>
              </div>
            </li>
          ))
        ) : (
          <>需要登录</>
        )}
      </ol>
    </div>
  );
}
