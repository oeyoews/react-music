'use client';

import { use } from 'react';
import { useSongDetailData, useArtistData } from '~app/hooks';
import { getSimiSong, getSongComment } from '~lib/search';
import AudioSong from '~app/ui/AudioSong';
import SongCommentTab from '~app/ui/SongCommentTab';
import Link from 'next/link';
import useSWRImmutable from 'swr/immutable';
import useSWR from 'swr';
import { Suspense } from 'react';
import Spinner from '~app/ui/Spinner';

export const revalidate = process.env.NODE_ENV === 'production' ? 60 : 0;

// export async function generateMetadata({ params }: { params: Params }) {
//   const { slug } = params;
//   const name = use(useSongDetailData(slug).songs[0].name);
//   return {
//     title: `正在播放 - ${song.name}`,
//   };
// }

export default function Page({ params }: { params: Params }) {
  const { slug } = params;

  const MusicPlayer = () => {
    const songDetailData = useSongDetailData(slug);
    const artistDetailData = useArtistData(songDetailData.songs[0].id, slug);
    const song = songDetailData?.songs[0];
    const previleges = songDetailData?.privileges[0];
    const vip = previleges?.fee === 1 ? true : false;

    return (
      <Suspense fallback={<Spinner />}>
        <AudioSong songInfo={song} artist={artistDetailData.data?.artist} />
        <h2>
          歌曲名: {song.name}
          {vip && (
            <sup className="bg-rose-400 text-black rounded-sm px-0.5 font-normal text-sm mx-2">
              VIP
            </sup>
          )}
        </h2>
      </Suspense>
    );
  };

  const ArtistInfo = () => {
    const songDetailData = useSongDetailData(slug);
    const artistDetailData = useArtistData(songDetailData.songs[0].id, slug);
    const artist = artistDetailData.data?.artist;

    return (
      <div className="my-4">
        <h2 className="my-2">歌手简介</h2>
        <Suspense fallback={<Spinner />}>
          <Link
            href={`/artist/${artist?.id}`}
            className="no-underline font-bold">
            {artist?.name}
          </Link>
          <p className="my-2">{artist?.briefDesc}</p>
        </Suspense>
      </div>
    );
  };

  const SongComment = () => {
    const { data: songCommentData } = useSWR(
      slug + 'comment',
      () => getSongComment(slug),
      { suspense: true },
    );

    return (
      <div>
        <Suspense fallback={<Spinner />}>
          <div className="flex justify-start items-center space-x-2 mt-8">
            <h2 className="my-2">评论区</h2>
            <div>共 {songCommentData?.total?.toLocaleString() || 0} 条评论</div>
          </div>
          <SongCommentTab songComment={songCommentData!} />
        </Suspense>
      </div>
    );
  };

  const SimiSong = () => {
    const { data: simiSongData } = useSWRImmutable(slug + 'simi', () =>
      getSimiSong(slug),
    );
    return (
      <div className="mt-4">
        <hr />
        <h2 className="my-2">相似歌曲</h2>
        <ol className="columns-2">
          {simiSongData?.songs.map((song) => {
            return (
              <li key={song.id}>
                <Link href={`/song/${song.id}`} className="no-underline">
                  {song.name} -- {song.artists[0].name}
                  {/* {song.artists[0].id} */}
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    );
  };

  return (
    <div className="my-2">
      {/* <h1> 歌曲详情 - {songInfo.name} {songInfo.id}{' '} </h1> */}
      {/* <div>音质: {musicInfo.level}</div> */}
      <MusicPlayer />
      <ArtistInfo />
      <SimiSong />
      <SongComment />
    </div>
  );
}
