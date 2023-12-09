'use client';
import { CgSpinner } from 'react-icons/cg';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { searchDefault } from '~lib/search';
import { FaSearch } from 'react-icons/fa';
import { useMusicStore } from '~lib/store';

export default function Search() {
  const defaultSearchWord = useMusicStore.use.defaultSearchWord();
  const setDefaultSearch = useMusicStore.use.setDefaultSearchWord();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, isLoading } = useSWR('/search/default', searchDefault);
  const searchWord = data?.data.showKeyword;
  const params = new URLSearchParams(searchParams);
  params.set('searchWord', defaultSearchWord || searchWord || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!defaultSearchWord && !searchWord) {
      toast.error('请输入关键字');
      return;
    }
    // toast.loading('搜索中...', {
    //   duration: 500,
    // });
    // TODO: use update url search params(简单的其实没必要使用replace, 比如searchparams 没有很多变化)
    // NOTE: 当前组件可以在任何路由触发, 不要使用当前路径
    router.push(`/search?searchWord=${defaultSearchWord || searchWord}`);
    // router.replace(`${pathname}?${params.toString()}`);
  };

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
