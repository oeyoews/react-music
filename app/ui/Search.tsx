'use client';

import { useRouter } from 'next/navigation';
import useStore from '~lib/store';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { searchDefault } from '~lib/search';

export default function Search() {
  const statusStore = useStore();
  const router = useRouter();
  const { data } = useSWR('/search/default', searchDefault);
  const searchWord = data?.data.showKeyword;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading('搜索中...', {
      duration: 500,
    });
    router.push(`/search/${statusStore.searchWord || searchWord}`);
  };

  return (
    <div className="my-8 min-h-screen">
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          autoFocus
          type="text"
          value={statusStore.searchWord}
          onChange={(e) => statusStore.setSearchWord(e.target.value)}
          placeholder={searchWord}
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
