'use client';

// TODO: remove use client
import { getMvDetail, getMvURL } from '~lib/mv';
import ArtPlayer from '~app/ui/Video/ArtPlayer';
import Spinner from '~app/ui/Spinner';
import toast from 'react-hot-toast';
import SongCommentTab from '~app/ui/SongCommentTab';
import { getMVComment } from '~lib/playlist';
import useSWR from 'swr';

export default function VideoPage({ params }: { params: Params }) {
  const { slug } = params;

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
    getMvURL(slug),
  );

  const mvURL = mvURLData?.data.url!;
  const id = mvURLData?.data.id;
  const mvName = mvDetailData?.data.name;
  const artistName = mvDetailData?.data.artistName;

  return (
    <div>
      <h2 className="text-center">
        {isLoading ? (
          <></>
        ) : (
          <div className="flex justify-center items-center">
            {mvName} -- {artistName}
          </div>
        )}
      </h2>
      <div className="flex justify-center items-center my-4">
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            <ArtPlayer
              id={id?.toString()}
              url={mvURL}
              className="aspect-video w-[1080px]"
              // getInstance={(art) => toast.success('加载成功')}
            />

            <div className="flex justify-start items-center space-x-2 mt-8">
              <h2 className="my-2">评论区</h2>
              <div>共{mvComment?.total?.toLocaleString()} 条评论</div>
            </div>
            <hr />
            <SongCommentTab songComment={mvComment as ISongComment} />
          </div>
        )}
      </div>
    </div>
  );
}
