'use client';

import { Tab } from '@headlessui/react';

import SongComment from './SongComment';

export default function SongCommentTab({ songComment }: { songComment: any }) {
  const { hotComments, comments } = songComment;
  const className =
    'ui-selected:bg-neutral-200/80 ui-selected:text-black ui-not-selected:bg-white ui-not-selected:text-black m-1 p-1 rounded transition-all duration-500';
  return (
    <Tab.Group>
      <Tab.List>
        <Tab className={className}>最新评论</Tab>
        <Tab className={className}>最热评论</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <SongComment comments={comments} />
        </Tab.Panel>
        <Tab.Panel>
          <SongComment comments={hotComments} />
        </Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
        <Tab.Panel>Content 3</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
