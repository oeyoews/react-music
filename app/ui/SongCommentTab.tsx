'use client';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import React from 'react';
import SongComment from './SongComment';

export default function SongCommentTab({ songComment }: { songComment: any }) {
  const { hotComments, comments } = songComment;
  return (
    <Tabs className="">
      <TabList>
        <Tab>最新评论</Tab>
        <Tab>热门评论</Tab>
      </TabList>

      <TabPanel>
        <SongComment comments={comments} />
      </TabPanel>
      <TabPanel>
        <SongComment comments={hotComments} />
      </TabPanel>
    </Tabs>
  );
}
