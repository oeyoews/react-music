'use client';

import { useEffect, useState } from 'react';
import { getUserDetail } from '~lib/login';
import Image from 'next/image';

export default function Avatar({ userData }: { userData: StarPickUser }) {
  const { userId, nickname } = userData;
  const [avatarURL, setAvatarURL] = useState('');

  useEffect(() => {
    getUserDetail(userId).then((res) => {
      setAvatarURL(res.profile.avatarUrl);
    });
  }, [userId]);

  return (
    <>
      {avatarURL && (
        <Image
          src={avatarURL}
          alt={nickname}
          width={22}
          height={22}
          className="rounded-full shadow-lg my-0"
        />
      )}
    </>
  );
}
