'use client';

import axios from 'axios';
import APlayer from '~components/Player/APlayer';
import { useEffect, useState } from 'react';
// import { customfetch as fetch } from '~lib/fetchData';
import { useMusicURL } from '~lib/hooks';
import { getMusicURL } from '~lib/search';

export const revalidate = 10;

export default function Page() {
  const [data, setData] = useState();
  const url = 'http://localhost:3000/api/lyric?id=33894312';
  const songurl = 'http://localhost:3000/api/song/url/v1?id=2100375261';
  axios.interceptors.response.use(
    (response) => {
      return response?.data;
    },
    (error) => {
      // 从错误对象中获取响应信息
      const response = error.response;
      // 断网处理
      // 状态码处理
      switch (response?.status) {
        case 400:
          console.error('客户端错误：', response.status, response.statusText);
          // 执行客户端错误的处理逻辑
          break;
        case 401:
          console.error('未授权：', response.status, response.statusText);
          // 执行未授权的处理逻辑
          break;
        case 403:
          console.error('禁止访问：', response.status, response.statusText);
          // 执行禁止访问的处理逻辑
          break;
        case 404:
          console.error('未找到资源：', response.status, response.statusText);
          // 执行未找到资源的处理逻辑
          break;
        case 500:
          console.error('服务器错误：', response);
          // 执行服务器错误的处理逻辑
          break;
        default:
          // 处理其他状态码或错误条件
          console.error('未处理的错误：', error.message);
      }
      // 继续传递错误
      return Promise.reject(error);
    },
  );
  useEffect(() => {
    axios({
      url: songurl,
    }).then((res) => {
      // @ts-ignore
      setData(res);
    });
  }, []);

  return <div>{data && JSON.stringify(data)}</div>;
}
