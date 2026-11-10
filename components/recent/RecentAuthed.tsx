'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import useSWR from 'swr';
import RecentDetail from '~components/recent/RecentDetail';
import { getRecentView } from '~lib/api/recent';
import { isAccountCookie } from '~lib/cookie';
import { useCookie } from '~lib/hooks/useCookie';
import type { RecentViewData } from '~lib/recent-view';

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export default function RecentAuthed() {
  const cookie = useCookie();
  const hydrated = useHydrated();
  const accountCookie = isAccountCookie(cookie);
  const { data, isLoading, error } = useSWR(
    accountCookie ? ['recent-view', cookie] : null,
    () => getRecentView(cookie),
    { revalidateOnFocus: false }
  );

  if (!hydrated) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        加载中…
      </div>
    );
  }

  if (!accountCookie) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-xl font-semibold">最近播放</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          登录后可同步网易云账号的最近播放记录
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex h-9 items-center rounded-lg bg-[var(--brand)] px-4 text-sm text-white hover:opacity-90"
        >
          去登录
        </Link>
      </div>
    );
  }

  if (isLoading && !data) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        正在获取最近播放…
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-xl font-semibold">最近播放</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          记录加载失败，请确认音乐 API 已启动并已登录
        </p>
      </div>
    );
  }

  return <RecentDetail data={data as RecentViewData} />;
}
