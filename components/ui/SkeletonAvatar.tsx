import { cn } from '~lib/utils';

export default function SkeletonAvatar({ className }: { className?: string }) {
  // 动态的size 不支持???
  return (
    <div
      className={cn(
        'bg-gray-300 rounded-full animate-pulse shadow-lg my-0',
        `w-[22px]`,
        `h-[22px]`,
        className,
      )}
    />
  );
}
