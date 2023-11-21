'use client';

import { useEffect } from 'react';
import { ToastPosition, toast } from 'react-hot-toast';
import useStore from '~lib/store';

export default function Announcement({
  text,
  store,
  icon,
  position = 'top-right',
}: {
  text: string;
  store: boolean;
  icon?: any;
  position?: ToastPosition;
}) {
  // 首次加载提示, 状态管理
  const { firstLoading, setFirstLoading } = useStore();
  useEffect(() => {
    // process.env.NODE_ENV === 'production' &&
    return () => {
      if (firstLoading) {
        toast(text, {
          icon,
          position,
        });
      }
      if (store && firstLoading) {
        setFirstLoading(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
