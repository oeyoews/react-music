import Image from 'next/image';
export default async function Banners({ data }: { data: Banner[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 not-prose m-2">
      {data.map((banner) => (
        <div key={banner.imageUrl}>
          {/* <span>{banner.typeTitle}</span> */}
          <Image
            src={banner.imageUrl}
            alt={banner.typeTitle}
            priority={true}
            width={1080}
            height={480}
            className="rounded w-full"
          />
        </div>
      ))}
    </div>
  );
}
