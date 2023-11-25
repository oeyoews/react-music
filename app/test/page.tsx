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
    fetch('/api/song/url?id=31460206')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  });

  return <div>{data && JSON.stringify(data)}</div>;
}
