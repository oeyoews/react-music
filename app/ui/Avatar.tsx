'use client';

import Image from 'next/image';
import { useUserData } from '~app/hooks';
import Spinner from './Spinner';

export default function Avatar({ uid }: { uid: number }) {
  const { userData, isLoading } = useUserData(uid);
  const size = 22;
  return isLoading ? (
    <Spinner center={false} size={size} />
  ) : (
    <Image
      src={userData?.profile.avatarUrl}
      alt={userData?.profile.nickname}
      width={size}
      height={size}
      className="rounded-full shadow-lg my-0"
    />
  );
}
