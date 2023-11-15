'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
// TODO: click events
// @see-also https://github.com/imsyy/SPlayer/blob/9fa59359290558347ba86f03da699738e7398e44/src/components/Banner/index.vue#L38
export default function Banners({ data }: { data: Banner[] }) {
  const router = useRouter();
  const handleClick = (banner: Banner) => {
    const { targetType: type, targetId: id } = banner;
    switch (type) {
      case 1:
        // 歌曲页
        router.push(`/song/${id}`);
        break;
      case 10:
        // 专辑页
        router.push(`/album?id=${id}`);
        break;
      case 1000:
        // 歌单页
        router.push(`/playlist?id=${id}&page=1`);
        break;
      case 1004:
        // MV页
        router.push(`/video?id=${id}`);
        break;
      case 3000:
      // 站外链接
      default:
        break;
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 not-prose m-2">
      {data.map((banner) => (
        <div key={banner.imageUrl} onClick={() => handleClick(banner)}>
          {/* <span>{banner.typeTitle}</span> */}
          <Image
            src={banner.imageUrl}
            alt={banner.typeTitle}
            title={banner.typeTitle}
            priority={true}
            width={1080}
            className="hover:cursor-pointer rounded w-full"
            height={480}
          />
        </div>
      ))}
    </div>
  );
}
