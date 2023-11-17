import {
  checkSong,
  getArtistDetail,
  getLyric,
  getMusicURL,
  getSimiSong,
  getSongComment,
  getSongDetail,
} from '~lib/search';
import AudioSong from '~app/ui/AudioSong';
import SongCommentTab from '~app/ui/SongCommentTab';
import Link from 'next/link';
import { Suspense } from 'react';

export const revalidate = process.env.NODE_ENV === 'production' ? 60 : 0;

async function getSongInfo(slug: string) {
  // TODO: 总会运行两次, 第二次undefined, 难道是server side 获取不到slug的原因吗
  // 即使return, 也会继续运行???
  const songdetail = await getSongDetail(slug);
  return songdetail.songs[0];
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = params;
  const { name } = await getSongInfo(slug);
  return {
    title: `歌曲详情 - ${name}`,
  };
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = params;
  if (!slug) return <div>Loading ...</div>;
  const songInfo = await getSongInfo(slug);
  const musicData = await getMusicURL(slug);
  const isAvailable = await checkSong(songInfo.id);
  const songComment = await getSongComment(slug);
  const { total } = songComment;
  const { lrc } = await getLyric(slug);
  const simiSong = await getSimiSong(slug);
  const artistDetail = await getArtistDetail(songInfo.ar[0].id);
  const artist = artistDetail.data.artist;

  const SimiSong = ({ simiSong }: { simiSong: ISimiSong }) => {
    const { songs } = simiSong;
    return (
      <div className="mt-4">
        <hr />
        <h2 className="my-2">相似歌曲</h2>
        <ol className="columns-2">
          {songs.map((song) => {
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
      {/* TODO: 仍然不起作用, 部分歌曲403, 暂时采用outer */}
      <AudioSong
        // src={musicInfo.url}
        isAvailable={isAvailable}
        songInfo={songInfo}
        lrc={lrc}
        artist={artist}
      />
      <div>
        <hr />
        <h2 className="my-2">歌手简介</h2>
        <div>
          <Link
            href={`/artist/${artist.id}`}
            className="no-underline font-bold">
            {artist.name}
          </Link>
          <p className="my-2">{artist.briefDesc}</p>
        </div>
      </div>
      <SimiSong simiSong={simiSong} />
      <div className="flex justify-start items-center space-x-2 mt-8">
        <h2 className="my-2">评论区</h2>
        <div>共{total.toLocaleString()} 条评论</div>
      </div>
      <hr />
      <SongCommentTab songComment={songComment} />
    </div>
  );
}
