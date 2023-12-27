import { cn } from '~lib/utils';

const Button = ({
  children,
  onClick,
  className
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={cn('bg-zinc-200 rounded px-2 py-1 mx-2 my-2', className)}
  >
    {children}
  </button>
);

export default Button;
