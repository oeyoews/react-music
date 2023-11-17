import Image from 'next/image';
import { FaThumbsUp } from 'react-icons/fa';

export default function SongComment({
  comments,
}: {
  comments: HotComment[] | SongComment[];
}) {
  if (comments.length === 0) {
    return <div className="min-h-screen">暂无评论 ...</div>;
  }
  const commentList = comments
    .sort((a, b) => {
      return a.time > b.time ? -1 : 1;
    })
    .map((comment) => {
      return (
        <div key={comment.commentId} className="mb-4">
          <div className="flex justify-start items-center space-x-2 text-sm text-gray-400 my-2">
            <Image
              src={comment.user.avatarUrl}
              alt={comment.user.nickname}
              width={18}
              height={18}
              className="rounded-full shadow my-0"
            />
            <div>{comment.user.nickname}</div>
            <div>
              {
                new Date(comment.time)
                  .toISOString()
                  .replace('T', ' ')
                  .split('.')[0]
              }
            </div>
            <FaThumbsUp />
            <div>{comment.likedCount}</div>
          </div>
          <div>{comment.content}</div>
          <hr className="not-prose my-2" />
        </div>
      );
    });
  return <div className="min-h-screen">{commentList}</div>;
}
