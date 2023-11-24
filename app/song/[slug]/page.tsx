import SongCommentTab from '~components/SongCommentTab';
import Link from 'next/link';

import APlayer from '~components/Player/APlayer';
import Spinner from '~components/Spinner';
import DrawserComponent from '~components/DrawserComponent';
import MV from '~components/Video/MV';
import {
  getArtistDetail,
  getMusicURL,
  getSimiSong,
  getSongComment,
  getSongDetail,
} from '~lib/search';
import Aplayer from 'react-aplayer';
import { getArtistMV } from '~lib/mv';

export default async function Page({ params }: { params: Params }) {
  const { slug } = params;

  const songDetailData = await getSongDetail(slug);
  const MusicPlayer = async () => {
    const song = songDetailData.body.songs[0];
    const previleges = songDetailData?.body.privileges[0];
    // @ts-ignore
    const vip = previleges?.fee === 1 ? true : false;
    const musicBodyData = await getMusicURL(slug)
    if (musicBodyData.status !== 200) {
      return <div>歌曲加载失败</div>;
    }
    const url = musicBodyData.body as unknown as IMusicURL;
    console.log(musicBodyData.body);

    return (
      <div>
        <APlayer
          slug={slug}
          data={songDetailData.body}
          musicurl={url.data[0].url}
        />
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

  // const ArtistMVS = async () => {
  //   const arId = songDetailData.body?.songs[0].ar[0].id;
  //   const artistMVs = await getArtistMV(arId);
  //   if(artistMVs.code !== 200) {
  //     console.log(artistMVs.body.message);
  //     return <div>歌手MV加载失败</div>
  //   }
  //   return (
  //     <div>
  //       <MV data={artistMVs.body?.mvs!} />
  //     </div>
  //   );
  // };

  const ArtistInfo = async () => {
    const arId = songDetailData.body?.songs?.[0].ar?.[0].id;
    const artistBodyData = await getArtistDetail(arId);
    const artistData = artistBodyData.body as unknown as IArtistDetail;

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

  const SongComment = async () => {
    const songCommentData = await getSongComment(Number(slug));
    if (songCommentData.status !== 200) {
      return <div>评论加载失败</div>;
    }
    return (
      <div>
        <div className="flex justify-start items-center space-x-2">
          <h2 className="my-2">评论区</h2>
          <div>
            共 {songCommentData.body?.total?.toLocaleString() || 0} 条评论
          </div>
        </div>
        <SongCommentTab
          songComment={songCommentData.body as unknown as ISongComment}
        />
      </div>
    );
  };

  const SimiSong = async () => {
    const data = await getSimiSong(slug);

    return (
      <div className="mt-4">
        <hr />
        <h2 className="my-2">相似歌曲</h2>
        <ol className="columns-2">
          {data.body?.songs.map((song) => {
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
      <MusicPlayer />
      <div className="space-x-2 my-4">
        <DrawserComponent text="查看歌手信息">
          <ArtistInfo />
        </DrawserComponent>
        <DrawserComponent text="查看相似歌曲">
          <SimiSong />
        </DrawserComponent>
        {/* <DrawserComponent text="查看评论区">
          <SongComment />
        </DrawserComponent> */}
        {/* <DrawserComponent text="查看歌手MV">
          <ArtistMVS />
        </DrawserComponent> */}
      </div>
    </div>
  );
}
