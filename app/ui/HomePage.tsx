'use client';

import Image from 'next/image';
import toast from 'react-hot-toast';

export default function HomePage({ data }: { data: HomePage[] }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.error('仅在 app 上可用');
  };
  const icons = data.slice(0, 8).map(({ id, name, iconUrl, url }) => {
    return (
      <div key={id} className="">
        {/* <Link href={url} target="_blank"> */}
        <div className="flex items-center justify-center">
          <Image
            onClick={handleClick}
            src={iconUrl}
            alt={name}
            width={48}
            height={48}
            className="rounded-full shadow my-0 bg-rose-500 hover:cursor-pointer"
          />
        </div>
        <div className="hidden md:flex justify-center my-2 items-center">
          {name}
        </div>
        {/* </Link> */}
      </div>
    );
  });

  return (
    <div>
      <h2>入口列表</h2>
      <div className="mx-auto w-full grid gap-4 grid-cols-4 md:grid-cols-8 ">
        {icons}
      </div>
    </div>
  );
}
