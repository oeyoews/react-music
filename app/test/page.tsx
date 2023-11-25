'use client';

import React, { useEffect, useState } from 'react';

import axios from 'axios';

export default function page() {
  const Test = () => {
    const [data, setData] = useState();
    useEffect(() => {
      const cookie = localStorage.cookie;

      const res = fetch('/api/banners?id=999');
      console.log(res);
      axios.defaults.timeout = 5000;
      axios.defaults.withCredentials = true;
      axios.defaults.baseURL = '/api';

      axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          return Promise.reject(error);
        },
      );

      axios({
        url: '/banners',
        method: 'get',
        data: {},
        params: {
          type: 2,
        },
      })
        .then((res) => {
          setData(res.data);
        })
        .catch((e) => {
          if (e.response) {
            console.log(e);
          }
        });
    }, []);
    return <>{JSON.stringify(data)}</>;
  };

  return <Test />;
}
