import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '~app/globals.css';
import NextTopLoader from 'nextjs-toploader';
import { TooltipProvider } from '~components/ui/tooltip';
import { Toaster } from '~components/ui/toaster';
import { ThemeProvider } from '~components/theme-provider';
import { cn } from '~lib/utils';
import { DashboardShell } from './dashboard/layout';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'React Netease Cloud Music',
  description: 'React Netease Cloud Music',
  manifest: '/manifest.json',
  referrer: 'no-referrer' // 针对一些防盗链
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1.5,
  userScalable: true
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn('font-sans', inter.variable)}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Toaster />
            <NextTopLoader color="#eb6864" height={1} showSpinner={false} />
            <DashboardShell>{children}</DashboardShell>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
