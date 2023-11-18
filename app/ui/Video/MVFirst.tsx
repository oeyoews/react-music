import Image from 'next/image';
import Link from 'next/link';

export default async function MVFirst({ mvFirst }: { mvFirst: IMvFirst }) {
  const videos = mvFirst.data.slice(0, 8).map((mv) => {
    return (
      <div key={mv.id} className="">
        <Link href={`/video/${mv.id}`}>
          <Image
            src={mv.cover}
            alt={mv.name}
            width={256}
            height={144}
            className="rounded-md shadow m-0 w-full h-full aspect-video hover:scale-105 duration-500 transition-all"
          />
        </Link>
      </div>
    );
  });

  return (
    <div>
      <h2>热门MV</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">{videos}</div>
    </div>
  );
}
