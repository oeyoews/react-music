import { getAlbumDetail } from '~lib/search';
import Image from 'next/image';
import Link from 'next/link';
import { getAlbumComment } from '~lib/api/playlist';
import SongCommentTab from '~components/SongCommentTab';

export default async function Album({ params }: { params: Params }) {
  const { slug } = params;
  const albumDetail = await getAlbumDetail(slug);
  const albumComment = await getAlbumComment(slug);
  return (
    <>
      <div className="justify-center items-center flex">
        <Image
          src={albumDetail.album.picUrl}
          width={256}
          height={256}
          alt="img"
          className="rounded-full shadow-lg w-96"
        />
      </div>
      <div className="line-clamp-2">{albumDetail.album.description}</div>
      {/* TODO: center */}
      <ol className="columns-1 md:columns-2">
        {albumDetail.songs.map((song) => {
          return (
            <Link
              href={`/song/${song.id}`}
              key={song.id.toString()}
              className="no-underline">
              <li>{song.name}</li>
            </Link>
          );
        })}
      </ol>
      <div className="flex justify-start items-center space-x-2 mt-8">
        <h2 className="my-2">歌单评论区</h2>
        <div>共{albumComment.total?.toLocaleString()} 条评论</div>
      </div>
      <SongCommentTab songComment={albumComment} />
    </>
  );
}
