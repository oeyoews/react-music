'use client';

import APlayer from '~components/Player/APlayer';
import { useEffect, useState } from 'react';
// import { customfetch as fetch } from '~lib/fetchData';
import { useMusicURL } from '~lib/hooks';
import { getMusicURL } from '~lib/search';

export const revalidate = 10;

export default function Page() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch('http://localhost:3000/api/lyric?id=33894312', {
      method: 'GET',
      // cache: 'no-store',
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
    // .then((res) => res.json())
    // .then((data) => {
    //   console.log(data);
    // });
  }, []);

  return <div>{data && JSON.stringify(data)}</div>;
}
