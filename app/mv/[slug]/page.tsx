'use client';

import { getMvDetail, getMvURL } from '~lib/mv';
import ArtPlayer from '~components/Player/ArtPlayer';
import Spinner from '~components/Spinner';
import SongCommentTab from '~components/SongCommentTab';
import useSWRImmutable from 'swr/immutable';
import { useMvComment } from '~lib/hooks';
import DrawserComponent from '~components/DrawserComponent';
import { notFound } from 'next/navigation';

export default function VideoPage({ params }: { params: Params }) {
  const { slug } = params;

  const { data: mvComment } = useMvComment(slug);

  // TODO: 支持选择分辨率 /mv/url
  const VideoTitle = () => {
    const { data: mvDetailData, isLoading } = useSWRImmutable(
      slug + 'detail',
      () => getMvDetail(slug),
    );
    if (isLoading) {
      return null;
    }
    const {
      name = '',
      artistName = '',
      desc,
    } = (mvDetailData?.data as IMvDetailData) || {};
    return (
      <>
        <h2 className="text-center">
          {name} {name && '--'} {artistName}
        </h2>
        <p className="font-normal text-sm">{desc}</p>
      </>
    );
  };

  const VideoPlayer = () => {
    const {
      error,
      data: mvURLData,
      isLoading,
    } = useSWRImmutable(slug + 'mvurl', () =>
      getMvURL(slug, localStorage.cookie),
    );

    if (!mvURLData?.data.url) {
      return <div>加载错误</div>;
    }

    return (
      <div className="flex justify-center items-center my-4">
        {isLoading ? (
          <Spinner />
        ) : (
          <ArtPlayer
            // id={mvURLData?.data.id.toString()}
            url={mvURLData?.data.url!}
            className="aspect-video w-[980px]"
          />
        )}
      </div>
    );
  };

  return (
    <>
      <VideoTitle />
      <VideoPlayer />
      <DrawserComponent text="查看评论区">
        <div className="flex justify-start items-center space-x-2 mt-8">
          <h2 className="my-2">评论区</h2>
          <div>共 {mvComment?.total?.toLocaleString()} 条评论</div>
        </div>
        <SongCommentTab songComment={mvComment as ISongComment} />
      </DrawserComponent>
      {/* <DrawserComponent text="查看相似MV">
        <SiMiMV mvId={slug} />
      </DrawserComponent> */}
    </>
  );
}
