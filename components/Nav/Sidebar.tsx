'use client';

import React from 'react';

import Link from 'next/link';
import { RiNeteaseCloudMusicFill } from 'react-icons/ri';
import { FaComment, FaSearch, FaStar, FaUser, FaVideo } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import SidebarSearchMusic from '~components/SidebarSearchMusic';

const pcSidebarItems = [
  { href: '/', title: '为我推荐', icon: <FaStar /> },
  { href: '/mv', title: 'MV视频', icon: <FaVideo /> },
  {
    href: '/starpick',
    title: '云村星评馆',
    icon: <FaComment />,
  },
  // { href: '/search', title: '搜索音乐', icon: <FaSearch /> },
  { href: '/login', title: '用户', icon: <FaUser /> },
];

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="shadow-lg select-none hidden md:flex fixed left-0 top-0 dark:bg-slate-950 backdrop-blur-sm p-4 h-screen space-y-2 bgblack flex-col w-52">
      <Link href={'/'}>
        <div className="flex mb-8">
          <RiNeteaseCloudMusicFill className="w-8 h-8 mr-2 text-rose-500/95" />
          <div className="flex items-center space-x-2">
            <div className="text-base font-semibold">网易云音乐</div>
            <button className="badge rounded-sm badge-error badge-outline px-0.5">
              Beta
            </button>
          </div>
        </div>
      </Link>

      <ul className="menu rounded-box">
        {pcSidebarItems.map((item) => (
          <li
            key={item.href}
            className={`${pathname === item.href ? 'active' : ''} rounded-sm`}>
            <Link href={item.href}>
              <div className={`my-1`}>
                {React.cloneElement(item.icon, { className: 'inline mx-2' })}
                {item.title}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <SidebarSearchMusic />

      <div className="bottom-2 right-2 absolute">
        <label className="swap swap-rotate">
          <input type="checkbox" className="theme-controller" value="dark" />

          <svg
            className="swap-on fill-current w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          <svg
            className="swap-off fill-current w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
    </div>
  );
};
