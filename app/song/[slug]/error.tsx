'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-rose-400 font-bold text-lg">加载出错</p>
      <Link href={'/'} className="bg-neutral-200 rounded p-2">
        返回主页
      </Link>
    </div>
  );
}