import { useRouter } from 'next/navigation';
import useStore from '~lib/store';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { searchDefault } from '~lib/search';
import { FaSearch } from 'react-icons/fa';

export default function Search() {
  const statusStore = useStore();
  const router = useRouter();
  const { data } = useSWR('/search/default', searchDefault);
  const searchWord = data?.data.showKeyword;

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
          className="input w-full input-ghost mx-2"
        />
        <button type="submit" className="btn rounded-l-none">
          <FaSearch className="inline" />
        </button>
      </form>
    </div>
  );
}
