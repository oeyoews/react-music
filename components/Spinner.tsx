import { Spinner as SpinnerIcon } from '@/components/ui/spinner';

export default function Spinner({
  center = true,
  size = 40
}: {
  center?: boolean;
  size?: number;
}) {
  return (
    <div className={center ? 'flex items-center justify-center' : undefined}>
      <SpinnerIcon style={{ width: size, height: size }} />
    </div>
  );
}
