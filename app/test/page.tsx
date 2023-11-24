'use client';

import React, { useEffect, useState } from 'react';
import Banners from '~components/Banners';
import RecommendSongs from '~components/RecommendSongs';

export default function page() {
  const Test = () => {
    const [data, setData] = useState();
    useEffect(() => {
		const cookie = localStorage.cookie;

      fetch('/api/recommend_songs', {
        method: 'POST',
        body: JSON.stringify({ cookie }),
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
			setData(data)
        });
    }, []);
    // return <Banners data={data} />;
	  return <>{JSON.stringify(data)}</>
  };

  return <Test />;
}
