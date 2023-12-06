const APlayerSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center p-3 bg-white rounded shadow">
      <div className="flex items-center justify-between w-full animate-pulse">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 animate-pulse"></div>
          <div>
            <div className="bg-gray-300 w-32 h-4 rounded mb-1"></div>
            <div className="bg-gray-200 w-24 h-3 rounded"></div>
          </div>
        </div>
        <div className="bg-gray-300 w-8 h-8 rounded-full animate-pulse"></div>
      </div>
      <div className="w-full bg-gray-300 h-2 rounded-full shadow-inner mb-4 animate-pulse">
        <div
          className="bg-gray-400 h-2 rounded-full"
          style={{ width: '0%' }}></div>
      </div>
    </div>
  );
};

export default APlayerSkeleton;
