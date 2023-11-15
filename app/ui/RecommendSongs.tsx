export default function RecommendSongs({ data }: { data: DailySong[] }) {
  return (
    <div>
      <h2>每日推荐</h2>
      <hr />
      <ol className='columns-1 md:columns-2'>
        {data.map(({ name, id, recommendReason }) => (
          <li key={id}>
            <div className='flex space-x-2 items-center'>
              <div>{name}</div>
              <div className=''>
                {recommendReason && <div> -- {recommendReason}</div>}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
