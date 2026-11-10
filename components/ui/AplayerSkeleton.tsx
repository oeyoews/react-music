const APlayerSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center p-3 bg-card text-card-foreground rounded shadow">
      <div className="flex items-center justify-between w-full animate-pulse">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-muted-foreground/20 rounded-full mr-3 animate-pulse"></div>
          <div>
            <div className="bg-muted-foreground/20 w-32 h-4 rounded mb-1"></div>
            <div className="bg-muted-foreground/10 w-24 h-3 rounded"></div>
          </div>
        </div>
        <div className="bg-muted-foreground/20 w-8 h-8 rounded-full animate-pulse"></div>
      </div>
      <div className="w-full bg-muted-foreground/20 h-2 rounded-full shadow-inner animate-pulse mt-2 mb-0">
        <div
          className="bg-muted-foreground/40 h-2 rounded-full"
          style={{ width: '0%' }}
        ></div>
      </div>
    </div>
  );
};

export default APlayerSkeleton;
