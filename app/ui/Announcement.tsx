'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Announcement({ text }: { text: string }) {
  useEffect(() => {
    process.env.NODE_ENV === 'production' && toast.info(text);
  }, []);
  return <div></div>;
}
