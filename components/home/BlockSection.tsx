import BlockSectionLink from './BlockSectionLink';

export default function BlockSection({
  title,
  action,
  children
}: {
  title: string;
  action?: { href: string; label?: string };
  children: React.ReactNode;
}) {
  return (
    <section className="not-prose space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="m-0 text-xl font-semibold tracking-tight">{title}</h2>
        {action ? (
          <BlockSectionLink href={action.href} label={action.label} />
        ) : null}
      </div>
      {children}
    </section>
  );
}
