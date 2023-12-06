import clsx from 'clsx';

export default function SkeletonAvatar() {
  // 动态的size 不支持???
  return (
    <div
      className={clsx(
        'bg-gray-300 rounded-full animate-pulse shadow-lg my-0',
        `w-[22px]`,
        `h-[22px]`,
      )}
    />
  );
}
