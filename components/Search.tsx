'use client';

import { CgSpinner } from 'react-icons/cg';

import { useSearchParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { searchDefault } from '~lib/search';
import { FaSearch } from 'react-icons/fa';
import { useMusicStore } from '~lib/store';
import { useEffect } from 'react';

export default function Search() {
  const defaultSearchWord = useMusicStore.use.defaultSearchWord();
  const setDefaultSearch = useMusicStore.use.setDefaultSearchWord();

  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, isLoading } = useSWR('/search/default', searchDefault);
  let searchWord = data?.data.showKeyword.split(' ')[0];
  if (searchWord?.length! < 2) {
    searchWord = '';
  }
  const params = new URLSearchParams(searchParams);
  params.set('searchWord', defaultSearchWord || searchWord || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!defaultSearchWord && !searchWord) {
      toast.error('请输入关键字');
      return;
    }
    router.replace(`/search?${params.toString()}`);
  };
  useEffect(() => {
    // toast.error('在线搜索接口异常，暂时不建议使用 2023-12-10');
    return () => {
      toast.dismiss();
    };
  }, []);

  return (
    <div className="my-8">
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          autoFocus
          type="text"
          value={defaultSearchWord}
          onChange={(e) => setDefaultSearch(e.target.value)}
          placeholder={isLoading ? '加载中...' : searchWord}
          className="border border-gray-500 rounded-l-lg p-2 focus:outline-none w-full"
        />
        {isLoading ? (
          <button
            type="submit"
            disabled
            className="bg-gray-500 text-white py-2 px-4 rounded-r hover:bg-gray-700 focus:outline-none">
            <CgSpinner className="inline animate-spin" />
          </button>
        ) : (
          <button
            type="submit"
            className="bg-gray-500 text-white py-2 px-4 rounded-r hover:bg-gray-700 focus:outline-none">
            <FaSearch className="inline" />
          </button>
        )}
      </form>
    </div>
  );
}
