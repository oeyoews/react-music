// import { FaSearch, FaHome, FaMusic, FaUser } from 'react-icons/fa';
import { FcHome, FcSearch, FcSettings } from 'react-icons/fc';
import Link from 'next/link';
import React from 'react';

const navItems = [
  { href: '/', title: 'home', icon: <FcHome /> },
  { href: '/search', title: 'search', icon: <FcSearch /> },
  // { href: '/song', title: 'song', icon: <FaMusic /> },
  // TODO: use user avatar
  { href: '/login', title: 'login', icon: <FcSettings /> },
];

export default function Nav() {
  const btnClasses =
    'h-5 w-5 text-gray-400 hover:text-gray-600 transition-all hover:scale-105';

  return (
    <div className="sticky flex items-center mx-auto justify-end print:hidden top-0 left-0 right-0 z-[1000] backdrop-blur-sm p-4 bg-white/30 w-full space-x-4 px-4 lg:px-48">
      {navItems.map((item) => (
        <Link key={item.title} href={item.href} title={item.title}>
          {React.cloneElement(item.icon, { className: btnClasses })}
        </Link>
      ))}
    </div>
  );
}
