'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { SearchKeywordField } from '~components/Search/SearchKeywordField';
import { useMusicStore } from '~lib/store';

export default function Search() {
  const searchParams = useSearchParams();
  const searchWord = searchParams.get('searchWord') ?? '';
  const setDefaultSearch = useMusicStore.use.setDefaultSearchWord();

  useEffect(() => {
    if (searchWord) {
      setDefaultSearch(searchWord);
    }
  }, [searchWord, setDefaultSearch]);

  return (
    <div className="relative z-30 mt-4 mb-2">
      <SearchKeywordField variant="page" showBack autoFocus />
    </div>
  );
}
