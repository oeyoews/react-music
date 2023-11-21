'use client';

import Link from 'next/link';
import Avatar from './Avatar';
import { useStarPick } from '~lib/hooks';
import Spinner from './Spinner';

export default function StarPick() {
  const { data: startPickData, isLoading } = useStarPick();

  const StarPickComment = () => (
    <>
      {!isLoading &&
        startPickData?.data.blocks[0].creatives?.slice(0, 6).map((creative) => {
          const resources = creative.resources[0];
          const { songData, users } = resources.resourceExtInfo;
          const uid = users[0].userId;
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
                  <Avatar uid={uid} />
                  <div>{users[0].nickname}</div>
                </div>
              </div>
            </Link>
          );
        })}
    </>
  );

  return (
    <div className="my-4">
      <h2>云村星评</h2>
      {isLoading && <Spinner />}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        <StarPickComment />
      </div>
    </div>
  );
}
