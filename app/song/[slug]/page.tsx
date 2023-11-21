'use client';

import {
  useSongDetailData,
  useArtistData,
  useSiMiSong,
  useSongComment,
} from '~app/hooks';
import SongCommentTab from '~app/ui/SongCommentTab';
import Link from 'next/link';
import { Suspense, lazy } from 'react';
import Spinner from '~app/ui/Spinner';
import toast from 'react-hot-toast';
import { notFound } from 'next/navigation';

const APlayer = lazy(() => import('~app/ui/Player/APlayer'));

// export const revalidate = process.env.NODE_ENV === 'production' ? 60 : 0;

// TODO
// export async function generateMetadata({ params }: { params: Params }) {
//   const { slug } = params;
//   const name = use(useSongDetailData(slug).songs[0].name);
//   return {
//     title: `正在播放 - ${song.name}`,
//   };
// }

export default function Page({ params }: { params: Params }) {
  const { slug } = params;

  // TODO: swr 后, lrc 加载错误
  const MusicPlayer = () => {
    const { data: songDetailData, isLoading: isLoadingSong } =
      useSongDetailData(slug);
    const song = songDetailData?.songs[0];
    const previleges = songDetailData?.privileges[0];
    const vip = previleges?.fee === 1 ? true : false;

    // if (!song) {
    //   return <Spinner />;
    // }

    return (
      <div>
        {/* <SWRConfig
          value={{
            fallback: {},
          }}> */}
        {!isLoadingSong && <APlayer slug={slug} />}
        <h2>
          歌曲名: {song?.name}
          {vip && (
            <sup className="bg-rose-400 text-black rounded-sm px-0.5 font-normal text-sm mx-2">
              VIP
            </sup>
          )}
        </h2>
        {/* </SWRConfig> */}
      </div>
    );
  };

  // const ArtistInfo = () => {
  //   const { data: artistData, isLoading: isloadingArtist } =
  //     useArtistData(slug);
  //   return (
  //     <div className="my-4">
  //       {artistData?.data && (
  //         <div>
  //           <h2 className="my-2">歌手简介</h2>
  //           <Link
  //             href={`/artist/${artistData?.data?.artist?.id}`}
  //             className="no-underline font-bold">
  //             {artistData?.data.artist?.name}
  //           </Link>
  //           <p className="my-2">{artistData?.data.artist?.briefDesc}</p>
  //         </div>
  //       )}
  //     </div>
  //   );
  // };

  const SongComment = () => {
    const { data, isLoading } = useSongComment(slug);

    if (!isLoading && data?.code !== 200) {
      toast.error(`评论区: ${data?.message}` as string);
    }

    return (
      <div>
        {!isLoading && (
          <>
            <div className="flex justify-start items-center space-x-2">
              <h2 className="my-2">评论区</h2>
              <div>共 {data?.total?.toLocaleString() || 0} 条评论</div>
            </div>
            <SongCommentTab songComment={data as ISongComment} />
          </>
        )}
      </div>
    );
  };

  const SimiSong = () => {
    const { data, isLoading } = useSiMiSong(slug);
    return (
      <div className="mt-4">
        <hr />
        <h2 className="my-2">相似歌曲</h2>
        <ol className="columns-2">
          {!isLoading &&
            data?.songs?.map((song) => {
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
      {/* <ArtistInfo /> */}
      <SimiSong />
      <SongComment />
    </div>
  );
}
