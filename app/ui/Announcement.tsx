'use client';

import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import useStore from '~lib/store';

export default function Announcement({
  text,
  store,
}: {
  text: string;
  store: boolean;
}) {
  // 首次加载提示, 状态管理
  const statusStore = useStore();
  useEffect(() => {
    process.env.NODE_ENV === 'production' &&
      statusStore.firstLoading === false &&
      toast(text);
    if (store && !statusStore.firstLoading) {
      statusStore.setFirstLoading(true);
    }
  }, [text, statusStore, store]);
  return <div></div>;
}
