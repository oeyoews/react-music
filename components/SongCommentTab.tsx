'use client';

import { Tab } from '@headlessui/react';

import SongComment from './SongComment';

export default function SongCommentTab({
  songComment,
}: {
  songComment: ISongComment;
}) {
  const className =
    'btn mx-1 ui-selected:btn-info btn-outline ui-not-selected:btn-ghost';
  return (
    <div className="mb-8">
      <Tab.Group>
        <Tab.List>
          <Tab className={className}>最新评论</Tab>
          <Tab className={className}>最热评论</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <SongComment comments={songComment?.comments} />
          </Tab.Panel>
          <Tab.Panel>
            <SongComment comments={songComment?.hotComments} />
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
