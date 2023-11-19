'use client';

import { getMvDetail, getMvURL } from '~lib/mv';
import { useState, useEffect } from 'react';
import ArtPlayer from '~app/ui/Video/ArtPlayer';
import Spinner from '~app/ui/Spinner';
import toast from 'react-hot-toast';
import SongCommentTab from '~app/ui/SongCommentTab';
import { getMVComment } from '~lib/playlist';

export default function VideoPage({ params }: { params: Params }) {
  const { slug } = params;
  const [mvURL, setMVURL] = useState('');
  const [mvName, setMvName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);
  const [mvComment, setMvComment] = useState<ISongComment>();

  useEffect(() => {
    getMvDetail(slug).then((res) => {
      if (!res.data) {
        toast.error('加载出错');
        return;
      }
      setMvName(res.data?.name);
      setArtistName(res.data.artistName);
    });
    getMVComment(slug).then((res) => {
      setMvComment(res);
    });
    getMvURL(slug).then((res) => {
      setMVURL(res.data.url);
      res.data;
      setId(res.data.id.toString());
      if (res.data.url) {
        setLoading(false);
      }
    });
  }, [mvURL, slug]);

  return (
    <div>
      <h2 className="text-center">
        {mvName} -- {artistName}
      </h2>
      <div className="flex justify-center items-center my-4">
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <ArtPlayer
              id={id}
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
