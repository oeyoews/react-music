import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '~app/globals.css';
import Nav from '~components/Nav/Nav';
import NextTopLoader from 'nextjs-toploader';
import { Sidebar } from '~components/Nav/Sidebar';
import { Toaster } from 'react-hot-toast';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'React Netease Cloud Music',
  description: 'React Netease Cloud Music',
  manifest: '/manifest.json',
  referrer: 'no-referrer', // 针对一些防盗链
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1.5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx('antialiased min-h-screen', inter.className)}>
        <Toaster />
        <Nav />
        <NextTopLoader color="#eb6864" height={1} showSpinner={false} />
        <Sidebar />
        <div className="mt-6 prose ml-2 md:ml-56 mr-2 max-w-none px-2">
          {children}
        </div>
      </body>
    </html>
  );
}
