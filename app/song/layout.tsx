export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="prose max-w-none mx-auto">{children}</div>;
}
