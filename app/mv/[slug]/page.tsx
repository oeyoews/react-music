'use client';
import { customfetch as fetch } from '~lib/fetchData';

import { getMvURL } from '~lib/mv';
import { useEffect, useState } from 'react';
import ArtPlayer from '~components/Player/ArtPlayer';
import Spinner from '~components/Spinner';
import SongCommentTab from '~components/SongCommentTab';
import { Suspense } from 'react';
import DrawserComponent from '~components/DrawserComponent';
import { useMvComment, useMvDetail } from '~lib/hooks';

export default function VideoPage({ params }: { params: Params }) {
  const { slug } = params;

  const { data: mvDetailData } = useMvDetail(slug);
  const { data: mvComment, isLoading } = useMvComment(slug);

  const VideoTitle = () => {
    const mvName = mvDetailData?.data?.name;
    const artistName = mvDetailData?.data?.artistName;
    const desc = mvDetailData?.data.desc;
    return (
      <div className="">
        <Suspense fallback={<Spinner />}>
          <h2 className="text-center">
            {mvName} {mvName && '--'} {artistName}
          </h2>
          <p className="font-normal text-sm">{desc}</p>
        </Suspense>
      </div>
    );
  };

  // const VideoPlayer = () => {
  //   const { data: mvURLData, isLoading } = useSWRImmutable(
  //     slug + 'mvurl',
  //     () => getMvURL(slug, localStorage.cookie),
  //     {
  //       refreshInterval: 3600000, // 1小时
  //     },
  //   );
  //   return (
  //     <div className="flex justify-center items-center my-4">
  //       {isLoading && <Spinner />}
  //       {!isLoading && (
  //         <ArtPlayer
  //           // id={mvURLData?.data.id.toString()}
  //           url={mvURLData?.body?.data.url!}
  //           className="aspect-video w-[980px]"
  //         />
  //       )}
  //     </div>
  //   );
  // };

  return (
    <>
      <VideoTitle />
      {/* <VideoPlayer /> */}
      <DrawserComponent text="查看评论区">
        <div className="flex justify-start items-center space-x-2 mt-8">
          <h2 className="my-2">评论区</h2>
          <div>共 {mvComment?.total?.toLocaleString() || 0} 条评论</div>
        </div>
        <SongCommentTab songComment={mvComment as ISongComment} />
      </DrawserComponent>
    </>
  );
}
