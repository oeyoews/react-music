'use client';

import { use } from 'react';
import { getMvDetail, getMvURL } from '~lib/mv';
import ArtPlayer from '~components/Player/ArtPlayer';
import Spinner from '~components/Spinner';
import SongCommentTab from '~components/SongCommentTab';
import useSWRImmutable from 'swr/immutable';
import { useMvComment } from '~lib/hooks';

const VideoTitle = ({ slug }: { slug: string }) => {
  const { data: mvDetailData, isLoading } = useSWRImmutable(
    slug + 'detail',
    () => getMvDetail(slug)
  );
  if (isLoading) {
    return null;
  }
  const {
    name = '',
    artistName = '',
    desc
  } = (mvDetailData?.data as IMvDetailData) || {};
  return (
    <>
      <h2 className="">
        {name} {name && '--'} {artistName}
      </h2>
      <p className="font-normal text-sm">{desc}</p>
    </>
  );
};

const VideoPlayer = ({ slug }: { slug: string }) => {
  const {
    error,
    data: mvURLData,
    isLoading
  } = useSWRImmutable(slug + 'mvurl', () =>
    getMvURL(slug, localStorage.cookie)
  );

  if (!mvURLData?.data.url) {
    return null;
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

export default function VideoPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const { data: mvComment, isLoading } = useMvComment(slug);

  // TODO: 支持选择分辨率 /mv/url
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <VideoPlayer slug={slug} />
      <VideoTitle slug={slug} />
      <section className="mt-8">
        <h2 className="text-base font-medium">评论</h2>
        <p className="my-2 text-sm text-muted-foreground">
          共 {mvComment?.total?.toLocaleString() || 0} 条评论
        </p>
        <SongCommentTab songComment={mvComment as ISongComment} />
      </section>
    </>
  );
}
