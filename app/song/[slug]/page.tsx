'use client';

import {
  useSongDetailData,
  useArtistData,
  useSiMiSong,
  useSongComment,
} from '~lib/hooks';
import SongCommentTab from '~components/SongCommentTab';
import Link from 'next/link';
import toast from 'react-hot-toast';

import APlayer from '~components/Player/APlayer';
import Spinner from '~components/Spinner';
import { Suspense, useEffect } from 'react';

export default function Page({ params }: { params: Params }) {
  const { slug } = params;

  const MusicPlayer = () => {
    const { data: songDetailData, isLoading: isLoadingSong } =
      useSongDetailData(slug);
    const song = songDetailData?.songs[0];
    const previleges = songDetailData?.privileges[0];
    const vip = previleges?.fee === 1 ? true : false;

    return (
      <div>
        {isLoadingSong ? <Spinner /> : <APlayer slug={slug} />}
        <h2>歌曲名</h2>
        <div className="inline font-semibold">{song?.name}</div>
        {vip && (
          <sup className="bg-rose-400 text-black rounded-sm px-0.5 font-normal text-sm mx-2">
            VIP
          </sup>
        )}
      </div>
    );
  };

  const ArtistInfo = () => {
    const { data: songData } = useSongDetailData(slug);
    const arId = songData?.songs[0].ar[0].id;

    const { data: artistData, isLoading: isloadingArtist } = useArtistData(
      arId!,
    );

    return (
      <div className="my-4">
        {artistData?.data && (
          <div>
            <h2 className="my-2">歌手简介</h2>
            <Link
              title="点击查看具体详情"
              href={`/artist/${artistData?.data?.artist?.id}`}
              className="no-underline font-bold">
              {artistData?.data.artist?.name}
            </Link>
            <p className="my-2">{artistData?.data.artist?.briefDesc}</p>
          </div>
        )}
      </div>
    );
  };

  const SongComment = () => {
    const { data, isLoading } = useSongComment(slug);

    return (
      <div>
        <>
          <div className="flex justify-start items-center space-x-2">
            <h2 className="my-2">评论区</h2>
            <div>共 {data?.total?.toLocaleString() || 0} 条评论</div>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <SongCommentTab songComment={data as ISongComment} />
          )}
        </>
      </div>
    );
  };

  const SimiSong = () => {
    const { data, isLoading } = useSiMiSong(slug);
    return (
      <div className="mt-4">
        <hr />
        <h2 className="my-2">相似歌曲</h2>
        {isLoading ? (
          <Spinner />
        ) : (
          <ol className="columns-2">
            {data?.songs?.map((song) => {
              return (
                <li key={song.id}>
                  <Link href={`/song/${song.id}`} className="no-underline">
                    {song.name} -- {song.artists?.[0].name}
                    {/* {song.artists[0].id} */}
                  </Link>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    );
  };

  return (
    <div className="my-2">
      {/* <h1> 歌曲详情 - {songInfo.name} {songInfo.id}{' '} </h1> */}
      {/* TODO */}
      {/* <div>音质: {musicInfo.level}</div> */}
      {/* TODO: 有渲染问题 */}
      <MusicPlayer />
      <ArtistInfo />
      <SimiSong />
      <SongComment />
    </div>
  );
}
