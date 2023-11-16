'use client';

// Import the useRouter hook from 'next/router'
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Search() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) {
      toast.warn('请输入搜索内容');
      return;
    }
    router.push(`/search/${search}`);
  };

  return (
    <div className="my-8">
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          autoFocus
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for songs, artists, or albums"
          className="border border-gray-300 rounded-l p-2 focus:outline-none w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-r hover:bg-blue-700 focus:outline-none">
          Search
        </button>
      </form>
    </div>
  );
}
