'use client';

import { useRouter } from 'next/navigation';

export default function Song({ data }: { data: SongDetail }) {
  const router = useRouter();
  const handleClick = async () => {
    router.push(`/song/${data.id}`);
  };

  return (
    <li key={data.id} onClick={handleClick} className="hover:cursor-pointer">
      {data.name}
    </li>
  );
}
