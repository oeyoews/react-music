'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { searchDefault } from '~lib/search';
import { FaSearch } from 'react-icons/fa';
import { useMusicStore } from '~lib/store';

export default function Search() {
  const defaultSearchWord = useMusicStore.use.defaultSearchWord();
  const setDefaultSearch = useMusicStore.use.setDefaultSearchWord();

  const router = useRouter();
  const { data } = useSWR('/search/default', searchDefault);
  const searchWord = data?.data.showKeyword;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!defaultSearchWord && !searchWord) {
      toast.error('请输入关键字');
      return;
    }
    toast.loading('搜索中...', {
      duration: 500,
    });
    router.push(`/search/${defaultSearchWord || searchWord}`);
  };

  return (
    <div className="my-8">
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          autoFocus
          type="text"
          value={defaultSearchWord}
          onChange={(e) => setDefaultSearch(e.target.value)}
          placeholder={searchWord}
          className="border border-gray-500 rounded-l-lg p-2 focus:outline-none w-full"
        />
        <button
          type="submit"
          className="bg-gray-500 text-white py-2 px-4 rounded-r hover:bg-gray-700 focus:outline-none">
          <FaSearch className="inline" />
        </button>
      </form>
    </div>
  );
}
