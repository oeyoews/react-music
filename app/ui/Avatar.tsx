'use client';

import Image from 'next/image';
import { useUserData } from '~app/hooks';

export default function Avatar({ userData }: { userData: StarPickUser }) {
  const userDetail = useUserData(userData.userId);

  return (
    <Image
      src={userDetail.profile.avatarUrl}
      alt={userData.nickname}
      width={22}
      height={22}
      className="rounded-full shadow-lg my-0"
    />
  );
}
