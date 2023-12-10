'use client';

import { useEffect, useState } from 'react';
import { search } from '~lib/search';

// production 的结果完全不对
export default function Page() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    const test = async () => {
      const data = await search('海底');
      setData(data);
    };
    test();
  }, []);
  return <div>{JSON.stringify(data)}</div>;
}
