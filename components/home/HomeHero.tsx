import Link from 'next/link';
import { CompassIcon, FlameIcon, MessageSquareQuoteIcon } from 'lucide-react';

const quickLinks = [
  { href: '/search', label: '搜索音乐', icon: CompassIcon },
  { href: '/starpick', label: '云村星评', icon: MessageSquareQuoteIcon },
  { href: '/mv', label: 'MV 广场', icon: FlameIcon }
] as const;

/**
 * 首页顶部简介。纯静态内容，不依赖接口，接口全挂也能正常显示。
 */
export default function HomeHero() {
  return (
    <section className="not-prose flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-rose-50 via-background to-background p-6 ring-1 ring-foreground/5 dark:from-rose-950/20">
      <div className="space-y-1">
        <h1 className="m-0 text-2xl font-semibold tracking-tight">
          发现好音乐
        </h1>
        <p className="text-sm text-muted-foreground">
          歌单、每日推荐与云村乐评，打开就能听。
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {quickLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1.5 text-xs font-medium ring-1 ring-foreground/10 transition-colors hover:bg-muted hover:ring-foreground/20"
          >
            <Icon className="size-3.5" />
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
}
