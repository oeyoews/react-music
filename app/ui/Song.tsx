'use client';

import { useRouter } from 'next/navigation';
import clsx from 'clsx';

export default function Song({ data }: { data: SongDetail }) {
  const router = useRouter();
  const handleClick = async () => {
    router.push(`/song/${data.id}`);
  };

  const classes = clsx(
    // {
    //   // @ts-ignore
    //   'text-red-500': data.success === false,
    // },
    'hover:cursor-pointer',
  );

  return (
    <li key={data.id} onClick={handleClick} className={classes}>
      {data.name}
    </li>
  );
}
