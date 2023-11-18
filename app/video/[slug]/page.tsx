'use client';

import { getMvURL } from '~lib/mv';
import { useState, useEffect } from 'react';
import ArtPlayer from '~app/ui/Video/ArtPlayer';

export default function VideoPage({ params }: { params: Params }) {
  const { slug } = params;
  const [mvURL, setMVURL] = useState('');
  const [id, setId] = useState('');
  useEffect(() => {
    getMvURL(slug).then((res) => {
      setMVURL(res.data.url);
      setId(res.data.id.toString());
    });
  }, [mvURL, slug]);

  return (
    <div className="flex justify-center items-center my-4">
      <ArtPlayer
        id={id}
        url={mvURL}
        className="aspect-video w-[1080px]"
        // getInstance={(art) => toast.success('加载成功')}
      />
      )
    </div>
  );
}
