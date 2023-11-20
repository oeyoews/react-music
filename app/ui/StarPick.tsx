'use client';

import Link from 'next/link';
import Avatar from './Avatar';
import { Suspense, useEffect, useState } from 'react';
import { useStarPick } from '~app/hooks';
import Spinner from './Spinner';

// TODO: swr
export default function StarPick() {
  const [hasCookie, setHasCookie] = useState(false);

  useEffect(() => {
    localStorage.cookie && setHasCookie(true);
  }, []);

  const starPick = useStarPick();

  const content = (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
      <Suspense fallback={<Spinner />}>
        {starPick.comments?.creatives?.slice(0, 6).map((creative) => {
          const resources = creative.resources[0];
          const { songData, users } = resources.resourceExtInfo;
          return (
            <Link
              href={`/song/${songData.id}`}
              key={creative.creativeId}
              title={songData.name}
              className="hover:scale-105 transition-all duration-500">
              <div className="w-full h-full m-2 flex justify-between p-2 flex-wrap bg-neutral-100 rounded-md shadow">
                <div className="w-full md:w-auto">
                  <div className="line-clamp-3">
                    {resources.uiElement.mainTitle.titleDesc} --
                  </div>
                </div>
                <div className="flex items-center space-x-2 w-full justify-end">
                  <Avatar userData={users[0]} />
                  <div>{users[0].nickname}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </Suspense>
    </div>
  );

  return (
    <div className="m-2">
      <h2>云村星评</h2>
      {content}
      {/* {!hasCookie && <div className="text-center text-rose-400">需要登录</div>} */}
    </div>
  );
}
