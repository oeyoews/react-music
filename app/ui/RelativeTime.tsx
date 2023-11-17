'use client';

import { useEffect, useState } from 'react';
import getRelativeTime from '~lib/getRelativeTime';

export default function RelativeTime({ timestamp }: { timestamp: number }) {
  const [relativeTime, setRelativeTime] = useState('');
  useEffect(() => {
    setRelativeTime(getRelativeTime(timestamp));
  }, [timestamp]);
  return <div>{relativeTime}</div>;
}
