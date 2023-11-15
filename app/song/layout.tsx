export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="prose max-w-4xl mx-auto">{children}</div>;
}
