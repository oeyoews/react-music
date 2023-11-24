'use client';

import React, { useEffect, useState } from 'react';
import Banners from '~components/Banners';
import RecommendSongs from '~components/RecommendSongs';

export default function page() {
  const Test = () => {
    const [data, setData] = useState();
    useEffect(() => {
		const cookie = localStorage.cookie;

      fetch('/api/artist_detail', {
        method: 'POST',
        // 1399112638
        body: JSON.stringify({ cookie, id: 58955789 }),
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
			setData(data)
        });
    }, []);
	  return <>{JSON.stringify(data)}</>
  };

  return <Test />;
}
