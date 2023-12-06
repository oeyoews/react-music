const SkeletonSongs = ({ count = 1 }: { count: number }) => {
  const loader = Array.from({ length: count }).map((_, index) => (
    <li key={index} className="animate-pulse mt-0">
      <div className="flex space-x-2 items-center">
        <div className="bg-gray-300 h-4 w-32 rounded-md"></div>
        <div className="bg-gray-300 h-4 w-32 rounded-md"></div>
      </div>
    </li>
  ));

  return <ul className="columns-1 md:columns-2">{loader}</ul>;
};
export default SkeletonSongs;
