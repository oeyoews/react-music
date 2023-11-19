import {
  getArtistDetail,
  getSimiSong,
  getSongComment,
  getSongDetail,
} from '~lib/search';
import AudioSong from '~app/ui/AudioSong';
import SongCommentTab from '~app/ui/SongCommentTab';
import Link from 'next/link';

export const revalidate = process.env.NODE_ENV === 'production' ? 60 : 0;

async function getSongInfo(slug: string) {
  // TODO: 总会运行两次, 第二次undefined, 难道是server side 获取不到slug的原因吗,似乎没有了
  // 即使return, 也会继续运行???
  const { songs, privileges } = await getSongDetail(slug);
  return {
    song: songs[0],
    vip: privileges[0].fee === 1 ? true : false,
  };
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = params;
  const { song } = await getSongInfo(slug);
  return {
    title: `歌曲详情 - ${song.name}`,
  };
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = params;
  if (!slug) return <div>Loading ...</div>;
  const { song, vip } = await getSongInfo(slug);
  const songComment = await getSongComment(slug);
  const { total = 0 } = songComment;
  const simiSong = await getSimiSong(slug);
  const artistDetail = await getArtistDetail(song.ar[0].id);
  // TODO: 可能没有版权
  const artist = artistDetail.data?.artist;

  if (!artist)
    return (
      <div className="flex justify-center items-start font-bold text-rose-400 my-4">
        没有版权
      </div>
    );

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
        songInfo={song}
        artist={artist}
      />
      <h2>
        歌曲名: {song.name}
        {vip && (
          <sup className="bg-rose-400 text-black rounded-sm px-0.5 font-normal text-sm mx-2">
            VIP
          </sup>
        )}
      </h2>
      <div className="my-4">
        <h2 className="my-2">歌手简介</h2>
        {artist && (
          <div>
            <Link
              href={`/artist/${artist.id}`}
              className="no-underline font-bold">
              {artist.name}
            </Link>
            <p className="my-2">{artist.briefDesc}</p>
          </div>
        )}
      </div>
      <SimiSong simiSong={simiSong} />
      <div className="flex justify-start items-center space-x-2 mt-8">
        <h2 className="my-2">评论区</h2>
        <div>共{total?.toLocaleString()} 条评论</div>
      </div>
      <hr />
      <SongCommentTab songComment={songComment} />
    </div>
  );
}
