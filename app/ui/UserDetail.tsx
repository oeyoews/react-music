'use client';

import { useEffect, useState } from 'react';
import { getUserDetail } from '~lib/login';
import Image from 'next/image';

export default function UserDetail({ userData }: { userData: StarPickUser }) {
  const { userId, nickname } = userData;
  const [avatarURL, setAvatarURL] = useState('');

  useEffect(() => {
    getUserDetail(userId).then((res) => {
      setAvatarURL(res.profile.avatarUrl);
    });
  }, [userId]);

  return (
    <div>
      <Image
        src={avatarURL}
        alt={nickname}
        width={50}
        height={50}
        className="rounded-full shadow my-0"
      />
      <div>{nickname}</div>
    </div>
  );
}
