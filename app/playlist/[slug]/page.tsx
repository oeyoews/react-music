import {
  getHotPlayList,
  getPlayListComment,
  getPlayListSongs,
} from '~lib/playlist';
import Link from 'next/link';
import Badge from '~app/ui/Badge';
import SongCommentTab from '~app/ui/SongCommentTab';
import Image from 'next/image';

export default async function Page({ params }: any) {
  const { slug } = params;
  const musicdata = await getHotPlayList();
  const { description, name, tags, createTime, updateTime, coverImgUrl } =
    musicdata.playlists[0];
  const { songs, privileges } = await getPlayListSongs(slug);
  const vipids = privileges
    .filter((privileges) => privileges.fee === 1)
    .map((vipPrivileges) => vipPrivileges.id);

  const getTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString().split('T')[0];
  };
  const playListComment = await getPlayListComment(slug);

  return (
    <div className="my-2">
      <h1 className="text-center">{name}</h1>
      <div className="flex justify-center items-center">
        <Image
          src={coverImgUrl}
          width={256}
          height={256}
          alt="img"
          className="rounded-full shadow-lg"
        />
      </div>
      <p className="line-clamp-2">{description}</p>
      {tags.map((tag) => (
        <Badge
          text={tag}
          key={tag}
          className="bg-lime-300 rounded px-2 py-1 mx-1"
        />
      ))}
      <div className="my-2 flex items-center space-x-2">
        <div>创建时间: {getTime(createTime)}</div>
        <div>更新时间: {getTime(updateTime)}</div>
      </div>
      <hr />
      <ol className="md:columns-2">
        {songs.map(({ id, name }) => (
          <li key={id}>
            <Link href={`/song/${id}`} className="no-underline">
              {name}
              {vipids.includes(id) && (
                <Badge
                  text={'VIP'}
                  className="ml-2 bg-rose-400 text-black px-0.5 font-serif"
                />
              )}
            </Link>
          </li>
        ))}
      </ol>
      <div className="flex justify-start items-center space-x-2 mt-8">
        <h2 className="my-2">歌单评论区</h2>
        <div>共{playListComment.total?.toLocaleString()} 条评论</div>
      </div>
      <SongCommentTab songComment={playListComment} />
    </div>
  );
}
