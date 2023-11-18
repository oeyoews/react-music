import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Nav from './ui/Nav';
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
        {/* <NextTopLoader /> */}
        <Toaster />
        <Nav />
        <div className="prose mx-auto max-w-6xl px-2">{children}</div>
      </body>
    </html>
  );
}
