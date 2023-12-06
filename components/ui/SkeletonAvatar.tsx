import clsx from 'clsx';

export default function SkeletonAvatar({ size = 22 }: { size?: number }) {
  return (
    <div
      className={clsx(
        'bg-gray-300 rounded-full animate-pulse shadow-lg my-0',
        `w-[${size}px]`,
        `h-[${size}px]`,
      )}
    />
  );
}
