'use client';

import { getStarPick } from '~lib/search';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import UserDetail from './UserDetail';

export default function StarPick() {
  const [starPick, setStarPick] = useState<StarPick>();
  useEffect(() => {
    getStarPick(localStorage.cookie).then((res) => {
      setStarPick(res.data);
    });
  });

  const blocks = starPick?.blocks.map((block) => {
    return block.creatives.map((creative) => {
      const resources = creative.resources[0];
      const { songData, users } = resources.resourceExtInfo;
      return (
        <div key={creative.creativeId} className="m-2 flex justify-between p-2">
          <div title={users[0].userId.toString()}>
            <UserDetail userData={users[0]} />
            {resources.uiElement.mainTitle.titleDesc} --
          </div>
          <Link href={`/song/${songData.id}`}>
            {songData.name} --
            {songData.artists[0].name}
          </Link>
        </div>
      );
    });
  });

  return (
    <div className="m-2">
      <h2>云村星评</h2>
      {blocks}
    </div>
  );
}
