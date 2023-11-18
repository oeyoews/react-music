'use client';

import { getMvDetail, getMvURL } from '~lib/mv';
import { useState, useEffect } from 'react';
import ArtPlayer from '~app/ui/Video/ArtPlayer';

export default function VideoPage({ params }: { params: Params }) {
  const { slug } = params;
  const [mvURL, setMVURL] = useState('');
  const [mvName, setMvName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    getMvDetail(slug).then((res) => {
      setMvName(res.data.name);
      setArtistName(res.data.artistName);
    });
    getMvURL(slug).then((res) => {
      setMVURL(res.data.url);
      res.data;
      setId(res.data.id.toString());
    });
  }, [mvURL, slug]);

  return (
    <div>
      <h2 className="text-center">
        {mvName} -- {artistName}
      </h2>
      <div className="flex justify-center items-center my-4">
        <ArtPlayer
          id={id}
          url={mvURL}
          className="aspect-video w-[1080px]"
          // getInstance={(art) => toast.success('加载成功')}
        />
        )
      </div>
    </div>
  );
}
