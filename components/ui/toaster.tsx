'use client';

import { Toaster as HotToaster } from 'react-hot-toast';

// 用 CSS 变量跟随主题，避免手动订阅 next-themes 造成闪动
export function Toaster() {
  return (
    <HotToaster
      toastOptions={{
        style: {
          background: 'var(--popover)',
          color: 'var(--popover-foreground)',
          border: '1px solid var(--border)',
          fontSize: '14px'
        }
      }}
    />
  );
}
