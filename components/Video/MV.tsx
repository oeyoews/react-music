import Image from 'next/image';
import Link from 'next/link';
import { FaPlay, FaVideo } from 'react-icons/fa';

export default function MV({
  data,
  total = 8,
}: {
  data: MvFirst[] | ArtistMV[] | any[];
  total?: number;
}) {
  if (data.length === 0) return <div>暂无MV</div>;

  const videos = data?.slice(0, total)?.map((mv) => {
    return (
      <div key={mv.id} title={mv.name}>
        <Link href={`/mv/${mv.id}`}>
          <div className="overflow-hidden rounded-md relative group">
            <div className="flex space-x-2 justify-between items-center text-sm text-black p-2 absolute backdrop-blur-md bg-white/10 w-full bottom-0 left-0 rounded-b-sm">
              <div className="truncate">{mv.name}</div>
              <div className="items-center flex space-x-2">
                <FaVideo />
                <div>{mv.playCount}</div>
              </div>
            </div>
            <div className="bg-white/10 transition-all z-50 hidden duration-500 backdrop-blur-sm group-hover:flex absolute bottom-0 right-0 w-full h-full justify-center items-center">
              <FaPlay className="w-16 h-16 text-gray-300" />
            </div>
            <Image
              src={mv.cover || mv.imgurl}
              alt={mv.name}
              width={256}
              height={144}
              className="rounded-md shadow m-0 w-full h-full aspect-video hover:scale-105 duration-500 transition-all"
            />
          </div>
        </Link>
      </div>
    );
  });

  return (
    <>
      <h2>MV</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">{videos}</div>
    </>
  );
}
