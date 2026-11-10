'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '~lib/utils';

export default function HorizontalRail({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(max > 1 && el.scrollLeft < max - 1);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState, children]);

  const scroll = (dir: 'left' | 'right') => {
    const el = ref.current;
    if (!el) return;
    const delta = dir === 'left' ? -el.clientWidth * 0.8 : el.clientWidth * 0.8;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  const showControls = canScrollLeft || canScrollRight;

  return (
    <div className={cn('group relative min-w-0', className)}>
      {showControls ? (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent" />
        </>
      ) : null}
      {canScrollLeft ? (
        <Button
          type="button"
          variant="secondary"
          size="icon-sm"
          className="absolute top-1/2 left-0 z-30 -translate-y-1/2 opacity-0 shadow group-hover:opacity-100"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            scroll('left');
          }}
          aria-label="向左滚动"
        >
          <ChevronLeft className="size-4" />
        </Button>
      ) : null}
      {canScrollRight ? (
        <Button
          type="button"
          variant="secondary"
          size="icon-sm"
          className="absolute top-1/2 right-0 z-30 -translate-y-1/2 opacity-0 shadow group-hover:opacity-100"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            scroll('right');
          }}
          aria-label="向右滚动"
        >
          <ChevronRight className="size-4" />
        </Button>
      ) : null}
      <div
        ref={ref}
        className="relative z-0 flex min-w-0 gap-4 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>*]:shrink-0"
      >
        {children}
      </div>
    </div>
  );
}
