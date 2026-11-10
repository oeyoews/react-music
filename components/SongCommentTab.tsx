'use client';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import SongComment from './SongComment';

export default function SongCommentTab({
  songComment
}: {
  songComment: ISongComment;
}) {
  const className =
    'ui-selected:bg-secondary ui-selected:text-secondary-foreground ui-not-selected:bg-muted/40 ui-not-selected:text-muted-foreground hover:text-foreground m-1 p-1 rounded transition-all duration-500';
  return (
    <div className="mb-8">
      <TabGroup>
        <TabList>
          <Tab className={className}>最新评论</Tab>
          <Tab className={className}>最热评论</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SongComment comments={songComment?.comments} />
          </TabPanel>
          <TabPanel>
            <SongComment comments={songComment?.hotComments} />
          </TabPanel>
          <TabPanel>Content 2</TabPanel>
          <TabPanel>Content 3</TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
