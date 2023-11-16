export default function HotPlaylist({ data }: { data: HotDetail[] }) {
  return (
    <div>
      <h2>热门歌单</h2>
      <hr />
      <ol className="columns-1 md:columns-2">
        {data.map((song) => (
          <li key={song.searchWord}>
            <div className="flex items-center">
              <div key={song.searchWord}>{song.searchWord}</div>
              {song.content && <div> -- {song.content}</div>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
