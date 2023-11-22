import { FcMusic, FcSearch, FcSettings } from 'react-icons/fc';
import Link from 'next/link';
import React from 'react';

import { RiNeteaseCloudMusicFill } from 'react-icons/ri';
import { FaComment, FaSearch, FaStar, FaUser, FaVideo } from 'react-icons/fa';

const mobNavItems = [
  { href: '/', title: 'home', icon: <FcMusic /> },
  { href: '/search', title: 'search', icon: <FcSearch /> },
  { href: '/login', title: 'login', icon: <FcSettings /> },
];

const pcSidebarItems = [
  { href: '/', title: '为我推荐', icon: <FaStar /> },
  { href: '/mv', title: 'MV视频', icon: <FaVideo /> },
  {
    href: '/starpick',
    title: '云村星评馆',
    icon: <FaComment />,
  },
  { href: '/search', title: '搜索音乐', icon: <FaSearch /> },
  { href: '/login', title: '用户', icon: <FaUser /> },
];

export default function MobNav() {
  const btnClasses =
    'h-5 w-5 text-gray-400 hover:text-gray-600 transition-all hover:scale-105';

  return (
    <div className="flex md:hidden sticky ml-48 items-center mx-auto justify-end inset-x-0 right-0 z-[1000] backdrop-blur-sm p-4 bg-white/20 space-x-4">
      {mobNavItems.map((item) => (
        <Link key={item.title} href={item.href} title={item.title}>
          {React.cloneElement(item.icon, { className: btnClasses })}
        </Link>
      ))}
    </div>
  );
}

export const PcSidebar = () => {
  return (
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
      {pcSidebarItems.map((item) => (
        <div
          key={item.title}
          className="p-2 rounded text-gray-500 m-0 transition-all hover:bg-neutral-200/90 duration-500">
          <Link href={item.href}>
            {React.cloneElement(item.icon, { className: 'inline' })}{' '}
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
};
