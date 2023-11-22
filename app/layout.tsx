import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '~app/globals.css';
import Nav from '~components/Nav';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { RiNeteaseCloudMusicFill } from 'react-icons/ri';
import { FaSearch, FaStar, FaUser, FaVideo } from 'react-icons/fa';

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
        <div className="select-none hidden md:flex fixed left-0 top-0 bg-slate-100/70 backdrop-blur-sm p-4 h-screen space-y-2 bgblack flex-col w-52">
          <Link href={'/'}>
            <div className="flex mb-8">
              <RiNeteaseCloudMusicFill className="w-8 h-8 mr-2 text-rose-500/95" />
              <div className="flex items-center space-x-2">
                <div className="text-sm font-semibold">网易云音乐</div>
                <button className="text-gray-800 border-gray-400 border p-0.5 rounded-sm font-bold text-[8px]">
                  Beta
                </button>
              </div>
            </div>
          </Link>
          <div className="p-2 rounded-md bg-rose-500 text-white m-0 w-full text-sm hover:bg-neutral-200 transition-all">
            <Link href="/">
              <FaStar className="inline" /> 为我推荐
            </Link>
          </div>
          <div className="p-2 rounded text-gray-500 m-0 transition-all hover:bg-neutral-200/90 duration-500">
            <Link href="/mv">
              <FaVideo className="inline" /> MV视频
            </Link>
          </div>
          <div className="p-2 rounded text-gray-500 m-0">
            <Link href="/search">
              <FaSearch className="inline" /> 搜索音乐
            </Link>
          </div>
          <div className="p-2 rounded text-gray-500 m-0">
            <Link href="/login">
              <FaUser className="inline" /> 用户
            </Link>
          </div>
        </div>
        <div className="mt-8 prose ml-2 md:ml-56 mr-2 max-w-none px-2">
          {children}
        </div>
      </body>
    </html>
  );
}
