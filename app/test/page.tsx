'use client';

import React, { useEffect, useState } from 'react';
import Banners from '~components/Banners';
import { useStarPick } from '~lib/hooks';

export default function page() {
  const Test = () => {
	const [data, setData] = useState<Banner[]>([]);
    useEffect(() => {
      fetch('/api/music').then((res) => res.json()).then((data) =>  setData(data) );
    }, []);
	return <Banners data={data} />
  };

return <Test />
}
