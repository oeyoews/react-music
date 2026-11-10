'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { ArrowLeft, SearchIcon, XIcon } from 'lucide-react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { searchDefault, searchKeywordSuggest } from '~lib/search';
import { keywordMatchesFromSuggest } from '~lib/search-keywords';
import { useMusicStore } from '~lib/store';
import { cn } from '~lib/utils';

type SearchKeywordFieldProps = {
  variant?: 'topbar' | 'page';
  showBack?: boolean;
  autoFocus?: boolean;
  className?: string;
};

export function SearchKeywordField({
  variant = 'page',
  showBack = false,
  autoFocus = false,
  className
}: SearchKeywordFieldProps) {
  const router = useRouter();
  const value = useMusicStore.use.defaultSearchWord();
  const setValue = useMusicStore.use.setDefaultSearchWord();

  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const rootRef = React.useRef<HTMLDivElement>(null);

  const { data: defaultData, isLoading: defaultLoading } = useSWR(
    '/search/default',
    searchDefault,
    { revalidateOnFocus: false }
  );

  const hint = defaultData?.data?.showKeyword?.split(' ')[0] ?? '';
  const trimmed = value.trim();

  const { data: suggestData, isLoading: suggestLoading } = useSWR(
    open && trimmed.length >= 1 ? ['search/keyword-suggest', trimmed] : null,
    () => searchKeywordSuggest(trimmed),
    { keepPreviousData: true }
  );

  const keywords = React.useMemo(
    () => keywordMatchesFromSuggest(suggestData ?? undefined),
    [suggestData]
  );

  const showPanel =
    open && trimmed.length >= 1 && (suggestLoading || keywords.length > 0);

  React.useEffect(() => {
    setActiveIndex(-1);
  }, [trimmed, keywords.length]);

  React.useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  const goSearch = (word: string) => {
    const keyword = word.trim();
    if (!keyword) {
      return;
    }
    setValue(keyword);
    setOpen(false);
    router.push(`/search?searchWord=${encodeURIComponent(keyword)}`);
  };

  const submit = (keyword?: string) => {
    const word = (keyword ?? trimmed ?? hint).trim();
    if (!word) {
      toast.error('请输入关键字');
      return;
    }
    goSearch(word);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (!showPanel || keywords.length === 0) {
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % keywords.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((i) => (i <= 0 ? keywords.length - 1 : i - 1));
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      goSearch(keywords[activeIndex]);
    }
  };

  const isTopbar = variant === 'topbar';

  return (
    <div
      ref={rootRef}
      className={cn(
        'relative',
        isTopbar ? 'w-full max-w-md' : 'w-full max-w-2xl',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center gap-2',
          !isTopbar &&
            'rounded-xl border border-sky-200/80 bg-sky-50/50 p-2 dark:border-border dark:bg-muted/30'
        )}
      >
        {showBack ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 rounded-lg border border-border/60 bg-background shadow-sm"
            onClick={() => router.back()}
            aria-label="返回"
          >
            <ArrowLeft className="size-4" />
          </Button>
        ) : null}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(
              activeIndex >= 0 && keywords[activeIndex]
                ? keywords[activeIndex]
                : undefined
            );
          }}
          className={cn(
            'relative min-w-0 flex-1',
            isTopbar && 'rounded-full border border-border bg-muted/40'
          )}
        >
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus={autoFocus}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder={
              defaultLoading ? '加载中...' : hint || '搜索音乐、歌手、歌词'
            }
            className={cn(
              'h-9 border-0 bg-transparent pr-9 pl-9 shadow-none focus-visible:ring-0',
              isTopbar ? 'rounded-full' : 'rounded-lg bg-background'
            )}
          />
          {value.length > 0 ? (
            <button
              type="button"
              className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="清空"
              onClick={() => {
                setValue('');
                setOpen(false);
              }}
            >
              <XIcon className="size-3.5" />
            </button>
          ) : null}
        </form>
      </div>

      {showPanel ? (
        <div
          className={cn(
            'absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-xl border border-border/80 bg-popover text-popover-foreground shadow-lg',
            isTopbar && 'sm:left-0'
          )}
        >
          <p className="px-4 pt-3 pb-1 text-xs text-muted-foreground">
            猜你想搜
          </p>
          <ul className="max-h-80 overflow-y-auto px-2 pb-2" role="listbox">
            {suggestLoading && keywords.length === 0 ? (
              <li className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
                <Spinner />
                加载联想…
              </li>
            ) : null}
            {keywords.map((keyword, index) => (
              <li key={`${keyword}-${index}`} role="option">
                <button
                  type="button"
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                    activeIndex === index
                      ? 'bg-muted text-foreground'
                      : 'hover:bg-muted/70'
                  )}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => goSearch(keyword)}
                >
                  <SearchIcon className="size-4 shrink-0 text-muted-foreground/70" />
                  <span className="truncate">{keyword}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
