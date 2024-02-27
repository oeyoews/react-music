import { FaStar, FaSearch, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import React from 'react';

const mobNavItems = [
  { href: '/', title: 'home', icon: <FaStar /> },
  { href: '/search', title: 'search', icon: <FaSearch /> },
  { href: '/login', title: 'login', icon: <FaUser /> }
];

export default function MobNav() {
  const btnClasses =
    'h-5 w-5 text-gray-400 hover:text-gray-600 transition-all hover:scale-105';

  return (
    <div className="flex lg:hidden sticky ml-48 items-center mx-auto justify-end inset-x-0 right-0 z-[1000] backdrop-blur-sm p-4 bg-white/20 space-x-4">
      {mobNavItems.map((item) => (
        <Link key={item.title} href={item.href} title={item.title}>
          {React.cloneElement(item.icon, { className: btnClasses })}
        </Link>
      ))}
    </div>
  );
}
