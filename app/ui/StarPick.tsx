'use client';

import Link from 'next/link';
import Avatar from './Avatar';
import { useStarPick } from '~app/hooks';

export default function StarPick() {
  const { data: startPickData } = useStarPick();
  const data = startPickData.data;

  const StarPickComment = () => (
    <>
      {data.blocks[0].creatives.slice(0, 6).map((creative) => {
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
                {/* 警告处理 */}
                {/* swr 嵌套更新 */}
                {/* <Avatar uid={users[0].userId} /> */}
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
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        <StarPickComment />
      </div>
    </div>
  );
}
