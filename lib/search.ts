// https://github.com/vercel/next.js/discussions/48324
// cache: 'no-cache', // 仍然提示 fetch for over 2MB of data can not be cached

// 创建一个工具函数，用于生成完整的 API 地址
function createApiUrl(endpoint: string): string {
  return `${process.env.NEXT_PUBLIC_MUSIC_API}/${endpoint}`;
}

// 重构每个函数，使用 createApiUrl 生成完整的 API 地址
export async function getMusicURL(id: number): Promise<MusicURL> {
  const res = await fetch(createApiUrl(`song/url?id=${id}`), {
    cache: 'force-cache',
    credentials: 'include',
  });
  const data = await res.json();
  return data;
}

export async function getPlayList(id: number): Promise<PlayListDetails> {
  const res = await fetch(createApiUrl(`playlist/detail?id=${id}`), {
    credentials: 'include',
  });
  const data = await res.json();
  return data;
}

export async function search(keywords: string): Promise<Search> {
  const res = await fetch(createApiUrl(`search?keywords=${keywords}`), {
    credentials: 'include',
  });
  const data = await res.json();
  return data;
}

export async function searchTop(id: number): Promise<SearchTop> {
  const res = await fetch(createApiUrl(`artist/top/song?id=${id}`), {
    credentials: 'include',
  });
  const data = await res.json();
  return data;
}
