'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Announcement({ text }: { text: string }) {
  // 首次加载提示, 状态管理
  useEffect(() => {
    process.env.NODE_ENV === 'production' && toast.info(text);
  }, [text]);
  return <div></div>;
}
