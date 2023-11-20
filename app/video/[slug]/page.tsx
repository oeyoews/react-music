'use client';

import { getMvDetail, getMvURL } from '~lib/mv';
import ArtPlayer from '~app/ui/Player/ArtPlayer';
import Spinner from '~app/ui/Spinner';
import SongCommentTab from '~app/ui/SongCommentTab';
import { getMVComment } from '~lib/mv';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import { Suspense, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function VideoPage({ params }: { params: Params }) {
  const { slug } = params;

  const { data: mvComment } = useSWRImmutable(slug, () => getMVComment(slug), {
    suspense: true,
  });

  useEffect(() => {
    if (mvComment.code !== 200) {
      toast.error(`评论区: ${mvComment.message}` as string);
    }
  }, [mvComment]);

  const VideoTitle = () => {
    const { data: mvDetailData } = useSWRImmutable(
      slug + 'detail',
      () => getMvDetail(slug),
      {
        suspense: true,
      },
    );
    const mvName = mvDetailData?.data?.name;
    const artistName = mvDetailData?.data?.artistName;

    return (
      <div className="flex justify-center items-center">
        <Suspense fallback={<Spinner />}>
          <h2 className="text-center">
            {mvName} {mvName && '--'} {artistName}
          </h2>
        </Suspense>
      </div>
    );
  };

  const VideoPlayer = () => {
    const { data: mvURLData } = useSWRImmutable(
      slug + 'url',
      () => getMvURL(slug, localStorage.cookie),
      {
        suspense: true,
        refreshInterval: 3600000, // 1小时
      },
    );

    return (
      <div className="flex justify-center items-center my-4">
        {localStorage.cookie ? (
          <Suspense fallback={<Spinner />}>
            <ArtPlayer
              // id={mvURLData?.data.id.toString()}
              url={mvURLData?.data.url!}
              className="aspect-video w-[980px]"
            />
          </Suspense>
        ) : (
          <div className="text-red-500">请先登录</div>
        )}
      </div>
    );
  };

  return (
    <>
      <VideoTitle />
      <VideoPlayer />
      <div className="flex justify-start items-center space-x-2 mt-8">
        <h2 className="my-2">评论区</h2>
        <div>共{mvComment?.total?.toLocaleString()} 条评论</div>
      </div>
      <SongCommentTab songComment={mvComment as ISongComment} />
    </>
  );
}
