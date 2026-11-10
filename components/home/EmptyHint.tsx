import { cn } from '~lib/utils';

/**
 * 各区块数据缺失时的统一占位。
 * 上游 API 经常返回 null，页面必须照常渲染。
 */
export default function EmptyHint({
  text,
  className
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'not-prose flex min-h-24 w-full items-center justify-center rounded-xl bg-muted/50 px-4 py-8 text-center text-sm text-muted-foreground ring-1 ring-foreground/5',
        className
      )}
    >
      {text}
    </div>
  );
}
