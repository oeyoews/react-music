import { cn } from '~lib/utils';

const Button = ({
  children,
  onClick,
  className
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  // TODO: 这里样式似乎不能动态计算出来 my-0 会被覆盖，即使得出来正确的样式，样式传了两层，会出现问题
  const classnames = cn('bg-zinc-200 rounded px-2 py-1 mx-2 my-2', className);
  return (
    <button onClick={onClick} className={classnames}>
      {children}
    </button>
  );
};

export default Button;
