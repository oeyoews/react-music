import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '~app/globals.css';
import Nav from '~components/Nav/Nav';
import { Sidebar } from '~components/Nav/Sidebar';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'React Netease Cloud Music',
  description: 'React Netease Cloud Music',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased `}>
        {/* TODO: 修复加载问题 */}
        <NextTopLoader />
        <Toaster />
        <Nav />
        <Sidebar />
        <div className="mt-8 prose ml-2 md:ml-56 mr-2 max-w-none px-2">
          {children}
        </div>
      </body>
    </html>
  );
}
