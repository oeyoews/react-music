'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center">
      <p className="text-rose-400 font-bold text-lg">加载出错</p>
    </div>
  );
}
