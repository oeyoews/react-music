'use client';

import React from 'react';

import Link from 'next/link';
import { RiNeteaseCloudMusicFill } from 'react-icons/ri';
import { FaComment, FaStar, FaUser, FaVideo } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import SidebarSearchMusic from '~components/SidebarSearchMusic';

const pcSidebarItems = [
  { href: '/', title: '为我推荐', icon: <FaStar /> },
  { href: '/mv', title: 'MV 视频', icon: <FaVideo />, disable: true },
  {
    href: '/starpick',
    title: '云村星评',
    icon: <FaComment />
  },
  // { href: '/search', title: '搜索音乐', icon: <FaSearch /> },
  { href: '/login', title: '用户信息', icon: <FaUser /> }
];

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="sticky w-1/6 select-none hidden lg:block left-0 top-0 bg-slate-100/70 backdrop-blur-sm p-4 h-screen space-y-2 bgblack flex-col">
      <Link href={'/'}>
        <div className="flex mb-8">
          <RiNeteaseCloudMusicFill className="w-8 h-8 mr-2 text-rose-500/95" />
          <div className="flex items-center space-x-2">
            <div className="text-base font-semibold">网易云音乐</div>
            <button className="text-gray-800 border-gray-400 border p-0.5 rounded-sm font-bold text-[8px]">
              Beta
            </button>
          </div>
        </div>
      </Link>

      {pcSidebarItems
        .filter((item) => !item.disable)
        .map((item) => (
          <Link href={item.href} key={item.title}>
            <div
              className={`p-2 rounded text-gray-500 mx-0 mb-2 transition-all ${
                // pathname.includes(item.href)
                pathname === item.href
                  ? 'bg-rose-500 text-white'
                  : 'hover:bg-slate-200/90'
              }`}
            >
              {React.cloneElement(item.icon, { className: 'inline mx-2' })}
              {item.title}
            </div>
          </Link>
        ))}
      <SidebarSearchMusic />
    </div>
  );
};
