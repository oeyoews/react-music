'use client';

import { useEffect, useState } from 'react';
import { getMusicURL, getSongDetail } from '~lib/search';

// async function getSongInfo(slug: string) {
//   const songdetail = await getSongDetail(Number(slug));
//   return songdetail.songs[0];
// }

// export async function generateMetadata({ params }: { params: Params }) {
//   const { slug } = params;
//   const { name } = await getSongInfo(slug);
//   return {
//     title: `歌曲详情 - ${name}`,
//   };
// }

export default function Page({ params }: { params: Params }) {
  const { slug } = params;
  const [musicdata, setMusicData] = useState<MusicURL[]>();
  const [songInfo, setSongInfo] = useState<SongDetail[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMusicURL(Number(slug))
      .then((data) => setMusicData(data.data))
      .then(() => setLoading(false));
    getSongDetail(Number(slug)).then((data) => setSongInfo(data.songs));
  }, [slug]);
  return (
    <div className="my-2">
      <h1>歌曲详情 - {songInfo?.[0].name} </h1>
      <div>音质: {musicdata?.[0].level}</div>
      <div className="flex justify-center items-center">
        {loading ? (
          <div>loading</div>
        ) : (
          <audio controls>
            <source src={musicdata?.[0].url} />
          </audio>
        )}
      </div>
    </div>
  );
}
