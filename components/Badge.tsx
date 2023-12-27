export default function Badge({
  text,
  className
}: {
  text: string | number;
  className?: string;
}) {
  return <sup className={className}>{text}</sup>;
}
