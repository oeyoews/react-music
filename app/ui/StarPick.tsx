'use client';

import { getStarPick } from '~lib/search';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Avatar from './Avatar';
import { loginAnonymous } from '~lib/login';

export default function StarPick() {
  const [starPick, setStarPick] = useState<StarPick>();
  const [loading, setLoading] = useState(true);
  const [cookie, setCookie] = useState('');

  useEffect(() => {
    // if (!localStorage.cookie) {
    //   loginAnonymous().then((res) => {
    //     setCookie(res.cookie);
    //     localStorage.setItem('cookie', res.cookie);
    //   });
    // }
    getStarPick(cookie).then((res) => {
      setStarPick(res.data);
      res && setLoading(false);
    });
  }, [cookie]);

  const content = (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
      {!loading && starPick?.blocks ? (
        starPick.blocks.map((block) => {
          return block.creatives?.slice(0, 9).map((creative) => {
            const resources = creative.resources[0];
            const { songData, users } = resources.resourceExtInfo;
            return (
              <Link
                href={`/song/${songData.id}`}
                key={creative.creativeId}
                className="hover:scale-105 transition-all">
                <div className="w-full h-full m-2 flex justify-between p-2 flex-wrap bg-neutral-100 rounded-md shadow">
                  <div
                    title={users[0].userId.toString()}
                    className="w-full md:w-auto">
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
          });
        })
      ) : (
        <></>
      )}
    </div>
  );

  return (
    <div className="m-2">
      <h2>云村星评</h2>
      {content}
    </div>
  );
}
