import { getRoute } from '~lib/getRoute';

import Link from 'next/link';
import Image from 'next/image';
import { Route } from 'next';
export default function Banners({ data }: { data: IBanner }) {
  return (
    <div className="mt-14">
      {/* sticky 对于framermotion bug, 需要多加一个div */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 not-prose ">
        {/* NOTE: 数量不固定 */}
        {data.banners.slice(0, 8).map((banner) => (
          <div
            key={banner.pic} // TODO: targetid is empty sometimes, use pic instead
            // variants={item}
            // md:first:col-span-2
            className="overflow-hidden rounded-md">
            {/* md:first:col-span-2 */}
            {/* <span>{banner.typeTitle}</span> */}
            <Link
              href={getRoute(banner) as Route}
              target={getRoute(banner).startsWith('http') ? '_blank' : ''}>
              <Image
                src={banner.pic}
                alt={banner.typeTitle}
                title={banner.typeTitle}
                priority={true}
                width={1080}
                className="hover:cursor-pointer rounded w-full hover:scale-105 transition-all duration-500 shadow"
                height={480}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
