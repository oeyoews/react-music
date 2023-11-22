// import { FaSearch, FaHome, FaMusic, FaUser } from 'react-icons/fa';
import { FcMusic, FcSearch, FcSettings } from 'react-icons/fc';
import Link from 'next/link';
import React from 'react';

const navItems = [
  { href: '/', title: 'home', icon: <FcMusic /> },
  { href: '/search', title: 'search', icon: <FcSearch /> },
  // { href: '/song', title: 'song', icon: <FaMusic /> },
  // TODO: use user avatar
  { href: '/login', title: 'login', icon: <FcSettings /> },
];

export default function Nav() {
  const btnClasses =
    'h-5 w-5 text-gray-400 hover:text-gray-600 transition-all hover:scale-105';

  // todo: refactor
  return (
    <div className="flex md:hidden sticky ml-48 items-center mx-auto justify-end inset-x-0 right-0 z-[1000] backdrop-blur-sm p-4 bg-white/20 space-x-4">
      {navItems.map((item) => (
        <Link key={item.title} href={item.href} title={item.title}>
          {React.cloneElement(item.icon, { className: btnClasses })}
        </Link>
      ))}
    </div>
  );
}
