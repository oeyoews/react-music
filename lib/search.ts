// https://github.com/vercel/next.js/discussions/48324
// cache: 'no-cache', // 仍然提示 fetch for over 2MB of data can not be cached

// 创建一个工具函数，用于生成完整的 API 地址
// 模仿axios 的写法
function createApiUrl(
  endpoint: string,
  params?: Record<string, string | number>
): string {
  const baseUrl = process.env.NEXT_PUBLIC_MUSIC_API;
  let apiUrl = `${baseUrl}/${endpoint}`;

  // 添加参数到 URL
  if (params) {
    const queryString = Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join('&');
    apiUrl = `${apiUrl}?${queryString}`;
  }

  return apiUrl;
}

// 获取音乐URL
export async function getMusicURL(id: number): Promise<MusicURL> {
  const res = await fetch(createApiUrl('song/url', { id }), {
    cache: 'force-cache',
    credentials: 'include',
  });
  const data = await res.json();
  return data;
}

// 获取播放列表详情
export async function getPlayList(id: number): Promise<PlayListDetails> {
  const res = await fetch(createApiUrl('playlist/detail', { id }), {
    credentials: 'include',
  });
  const data = await res.json();
  return data;
}

// 搜索音乐
export async function search(keywords: string): Promise<Search> {
  const res = await fetch(createApiUrl('search', { keywords }), {
    credentials: 'include',
  });
  const data = await res.json();
  return data;
}

// 获取艺术家热门歌曲
export async function searchTop(id: number): Promise<SearchTop> {
  const res = await fetch(createApiUrl('artist/top/song', { id }), {
    credentials: 'include',
  });
  const data = await res.json();
  return data;
}

// 示例：获取推荐歌单
// export async function getRecommendations(
//   limit: number
// ): Promise<Recommendations> {
//   const res = await fetch(createApiUrl('personalized', { limit }), {
//     credentials: 'include',
//   });
//   const data = await res.json();
//   return data;
// }

// // 示例：获取歌曲详情
// export async function getSongDetails(id: number): Promise<SongDetails> {
//   const res = await fetch(createApiUrl('song/detail', { id }), {
//     credentials: 'include',
//   });
//   const data = await res.json();
//   return data;
// }

// // 添加更多的 API 函数...
