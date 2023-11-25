import { useRouter } from 'next/navigation';
import useStore from '~lib/store';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { searchDefault } from '~lib/search';
import { FaSearch } from 'react-icons/fa';

export default async function Search() {
  const statusStore = useStore();
  const router = useRouter();
  const searchDefaultData = await searchDefault();
  const searchWord = searchDefaultData.data.showKeyword;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusStore.searchWord && !searchWord) {
      toast.error('请输入关键字');
      return;
    }
    toast.loading('搜索中...', {
      duration: 500,
    });
    router.push(`/search/${statusStore.searchWord || searchWord}`);
  };

  return (
    <div className="my-8">
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          autoFocus
          type="text"
          value={statusStore.searchWord}
          onChange={(e) => statusStore.setSearchWord(e.target.value)}
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
