'use client';

import Image from 'next/image';
import { Suspense } from 'react';
import { useUserData } from '~app/hooks';

export default function Avatar({ userData }: { userData: StarPickUser }) {
  const userDetail = useUserData(userData.userId);

  return (
    <Suspense>
      <Image
        src={userDetail?.profile?.avatarDetail}
        alt={userData.nickname}
        width={22}
        height={22}
        className="rounded-full shadow-lg my-0"
      />
    </Suspense>
  );
}
