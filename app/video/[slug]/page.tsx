'use client';

// TODO: remove use client
import { getMvDetail, getMvURL } from '~lib/mv';
import ArtPlayer from '~app/ui/Video/ArtPlayer';
import Spinner from '~app/ui/Spinner';
import SongCommentTab from '~app/ui/SongCommentTab';
import { getMVComment } from '~lib/mv';
import useSWR, { SWRConfig } from 'swr';
import { useEffect, useState } from 'react';

export default function VideoPage({ params }: { params: Params }) {
  const { slug } = params;
  const [hasCookie, setHasCookie] = useState(false);

  useEffect(() => {
    localStorage.cookie && setHasCookie(true);
  }, []);

  const {
    data: mvComment,
    error,
    isLoading,
  } = useSWR(slug, () => getMVComment(slug));

  const { data: mvDetailData, isLoading: isLoadingDetail } = useSWR(
    'detail',
    () => getMvDetail(slug),
  );
  const { data: mvURLData, isLoading: isLoadingURL } = useSWR('url', () =>
    getMvURL(slug, localStorage.cookie),
  );
  const url = mvURLData?.data.url;
  const id = mvURLData?.data?.id;
  const mvName = mvDetailData?.data?.name;
  const artistName = mvDetailData?.data?.artistName;

  const content = (
    <div>
      {/* title */}
      <h2 className="text-center">
        {isLoadingDetail ? (
          <></>
        ) : (
          <div className="flex justify-center items-center">
            {mvName} {mvName && '--'} {artistName}
          </div>
        )}
      </h2>
      {/* video */}
      <div className="flex justify-center items-center my-4">
        {isLoadingURL ? (
          <Spinner />
        ) : (
          <>
            {url && hasCookie ? (
              <ArtPlayer
                id={id?.toString()}
                url={url}
                className="aspect-video w-[980px]"
              />
            ) : (
              <div className="text-red-500">请先登录</div>
            )}
          </>
        )}
      </div>
      {/* comment */}
      <div className="flex justify-start items-center space-x-2 mt-8">
        <h2 className="my-2">评论区</h2>
        <div>共{mvComment?.total?.toLocaleString()} 条评论</div>
      </div>
      <SongCommentTab songComment={mvComment as ISongComment} />
    </div>
  );

  return (
    <SWRConfig
      // TODO: 不起作用, 需要配置fetch???
      value={{
        refreshInterval: 3600000,
      }}>
      {content}
    </SWRConfig>
  );
}
