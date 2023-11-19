import { getHotPlayList, getPlayListSongs } from '~lib/playlist';
import Link from 'next/link';
import Badge from '~app/ui/Badge';

export default async function Page({ params }: any) {
  const { slug } = params;
  const musicdata = await getHotPlayList();
  const { description, name, tags, createTime, updateTime } =
    musicdata.playlists[0];
  const { songs, privileges } = await getPlayListSongs(slug);
  const vipids = privileges
    .filter((privileges) => privileges.fee === 1)
    .map((vipPrivileges) => vipPrivileges.id);

  const getTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString().split('T')[0];
  };

  return (
    <div className="my-2">
      <h1>{name}</h1>
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
      <ol>
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
    </div>
  );
}
