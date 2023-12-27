import Image from 'next/image';
import { FaThumbsUp } from 'react-icons/fa';
import RelativeTime from './RelativeTime';

// TODO: 歌词分页，或者滚动到底更新
export default function SongComment({
  comments
}: {
  comments: HotComment[] | SongComment[];
}) {
  const commentList = comments
    ?.sort((a, b) => {
      return a.time > b.time ? -1 : 1;
    })
    .map((comment) => {
      return (
        <div key={comment.commentId} className="mb-4">
          <div className="flex justify-start items-center space-x-1 text-sm text-gray-400 my-2">
            <Image
              src={comment.user.avatarUrl}
              alt={comment.user.nickname}
              width={18}
              height={18}
              className="rounded-full shadow my-0"
            />
            <div>{comment.user.nickname}</div>
            <div>{comment.ipLocation.location}</div>
            <RelativeTime timestamp={comment.time} />
            <FaThumbsUp />
            <div>{comment.likedCount}</div>
          </div>
          <div>{comment.content}</div>
          <hr className="not-prose my-2" />
        </div>
      );
    });

  return <>{commentList} </>;
}
