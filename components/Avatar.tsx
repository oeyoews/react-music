'use client';

import Image from 'next/image';
import { useUserData } from '~lib/hooks';

export default function Avatar({ uid }: { uid: number }) {
  const { data, isLoading } = useUserData(uid);
  const size = 22;
  return isLoading ? (
    <div className={`w-[${size}px] h-[${size}px] skeleton rounded-full`}></div>
  ) : (
    <>
      <Image
        src={data?.profile.avatarUrl!}
        alt={data?.profile.nickname!}
        width={size}
        height={size}
        className="avatar rounded-full my-0"
      />
    </>
  );
}
