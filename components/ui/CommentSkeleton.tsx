interface SkeletonSongCommentProps {
  count: number;
}

const SkeletonSongComment = ({ count }: SkeletonSongCommentProps) => {
  const skeletonComments = Array.from({ length: count }).map((_, index) => (
    <div key={index} className="mb-4">
      <div className="flex justify-start items-center space-x-1 text-sm text-gray-400 my-2 animate-pulse">
        <div className="bg-gray-200 rounded-full w-6 h-6 shadow my-0" />
        <div className="bg-gray-200 w-16 h-4 animate-pulse" />
        <div className="bg-gray-200 w-16 h-4 animate-pulse" />
        <div className="bg-gray-200 w-16 h-4 animate-pulse" />
        <div className="bg-gray-200 w-16 h-4 animate-pulse" />
        <div className="bg-gray-200 w-4 h-4 animate-pulse" />
        <div className="bg-gray-200 w-6 h-4 animate-pulse" />
      </div>
      <div className="bg-gray-200 h-4 mb-2" />
      <hr className="not-prose my-2" />
    </div>
  ));

  return <div>{skeletonComments}</div>;
};

export default SkeletonSongComment;
