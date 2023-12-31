'use client';

import Image from 'next/image';
import { useUserData } from '~lib/hooks';
import SkeletonAvatar from './ui/SkeletonAvatar';

export default function Avatar({ uid }: { uid: number }) {
  const { data, isLoading } = useUserData(uid);
  const size = 22;
  return isLoading ? (
    <SkeletonAvatar />
  ) : (
    <Image
      unoptimized
      src={data?.profile.avatarUrl!}
      alt={data?.profile.nickname!}
      width={size}
      height={size}
      className="rounded-full shadow-lg my-0"
    />
  );
}
