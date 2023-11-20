'use client';

import Image from 'next/image';
import { useUserData } from '~app/hooks';

export default function Avatar({ uid }: { uid: number }) {
  const { userData, isLoading } = useUserData(uid);
  if (isLoading) return null;

  return (
    <Image
      src={userData.profile.avatarUrl}
      alt={userData.profile.nickname}
      width={22}
      height={22}
      className="rounded-full shadow-lg my-0"
    />
  );
}
