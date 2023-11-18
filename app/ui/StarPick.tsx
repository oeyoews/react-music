'use client';

import { getStarPick } from '~lib/search';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Avatar from './Avatar';

export default function StarPick() {
  const [starPick, setStarPick] = useState<StarPick>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getStarPick(localStorage.getItem('cookie') || '').then((res) => {
      setStarPick(res.data);
      setLoading(false);
    });
  });

  return (
    <div className="m-2">
      <h2>云村星评</h2>
      {!loading && starPick ? (
        starPick.blocks.map((block) => {
          return block.creatives.slice(0, 9).map((creative) => {
            const resources = creative.resources[0];
            const { songData, users } = resources.resourceExtInfo;
            return (
              <div key={creative.creativeId}>
                <div className="m-2 flex justify-between p-2 flex-wrap">
                  <div
                    title={users[0].userId.toString()}
                    className="w-full md:w-auto">
                    <div className="flex items-center space-x-2">
                      <div>{users[0].nickname}</div>
                      <Avatar userData={users[0]} />
                    </div>
                    {resources.uiElement.mainTitle.titleDesc} --
                  </div>
                  <div className="w-full md:auto text-right">
                    <Link href={`/song/${songData.id}`}>
                      {songData.name} --
                      {songData.artists[0].name}
                    </Link>
                  </div>
                </div>
                <hr />
              </div>
            );
          });
        })
      ) : (
        <div className="h-24 bg-neutral-100 animate-pulse">.</div>
      )}
    </div>
  );
}
