'use client';

import { useEffect } from 'react';
import { ToastPosition, toast } from 'react-hot-toast';

export default function Announcement({
  text,
  icon,
  position = 'top-right',
}: {
  text: string;
  icon?: any;
  position?: ToastPosition;
}) {
  // 首次加载提示, 状态管理
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      toast(text, {
        icon,
        position,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
