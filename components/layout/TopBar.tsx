'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SearchKeywordField } from '~components/Search/SearchKeywordField';
import { useMusicStore } from '~lib/store';
import { useCookie } from '~lib/hooks/useCookie';
import { getAccount } from '~lib/login';
import { cn } from '~lib/utils';

function SearchField() {
  const searchParams = useSearchParams();
  const searchWord = searchParams.get('searchWord') ?? '';
  const setDefaultSearch = useMusicStore.use.setDefaultSearchWord();

  useEffect(() => {
    if (searchWord) setDefaultSearch(searchWord);
  }, [searchWord, setDefaultSearch]);

  return <SearchKeywordField variant="topbar" />;
}

export function TopBar() {
  const router = useRouter();
  const cookie = useCookie();
  const userInfo = useMusicStore.use.userInfo();
  const setUserInfo = useMusicStore.use.setUserInfo();
  const setCookie = useMusicStore.use.setCookie();
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  useEffect(() => {
    if (cookie) setCookie(cookie);
    if (!cookie) return;
    getAccount(cookie).then((info) => {
      if (info?.profile) setUserInfo(info);
    });
  }, [cookie, setUserInfo, setCookie]);

  useEffect(() => {
    setCanGoBack(window.history.length > 1);
    setCanGoForward(false);
  }, []);

  const nickname = userInfo?.profile?.nickname;
  const avatar = userInfo?.profile?.avatarUrl;

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-border/60 bg-background/90 px-4 backdrop-blur-md">
      <SidebarTrigger className="md:hidden" />
      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          disabled={!canGoBack}
          onClick={() => router.back()}
          aria-label="后退"
        >
          <ArrowLeft className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          disabled={!canGoForward}
          onClick={() => router.forward()}
          aria-label="前进"
        >
          <ArrowRight className="size-4" />
        </Button>
      </div>

      <div className="flex flex-1 justify-center px-2">
        <Suspense
          fallback={
            <div className="h-9 w-full max-w-md animate-pulse rounded-full bg-muted" />
          }
        >
          <SearchField />
        </Suspense>
      </div>

      <Divider className="hidden sm:flex" />
      <ThemeToggle />
      {cookie && nickname ? (
        <Link
          href="/login"
          className="flex max-w-40 items-center gap-2 rounded-full bg-muted/50 py-1 pr-2 pl-1"
        >
          {avatar ? (
            <Image
              unoptimized
              src={avatar}
              alt={nickname}
              width={28}
              height={28}
              className="size-7 rounded-full object-cover"
            />
          ) : (
            <span className="size-7 rounded-full bg-muted" />
          )}
          <span className="truncate text-sm">{nickname}</span>
        </Link>
      ) : (
        <Button
          variant="secondary"
          size="sm"
          nativeButton={false}
          render={<Link href="/login" />}
        >
          登录
        </Button>
      )}
    </header>
  );
}

function Divider({ className }: { className?: string }) {
  return <div className={cn('h-6 w-px bg-border', className)} />;
}
