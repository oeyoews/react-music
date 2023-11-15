// 创建一个工具函数，用于生成完整的 API 地址
// 模仿axios 的写法
export function createApiUrl(
  endpoint: string,
  params?: Record<string, string | number>,
): string {
  const baseUrl = process.env.NEXT_PUBLIC_MUSIC_API;
  let apiUrl = `${baseUrl}${endpoint}`;

  // 添加参数到 URL
  if (params) {
    // Include timestamp only if not already present in params
    // if (!params.hasOwnProperty('timestamp')) {
    //   params.timestamp = new Date().getTime();
    // }
    const queryString = Object.keys(params)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
      )
      .join('&');
    apiUrl = `${apiUrl}?${queryString}`;
  }

  return apiUrl;
}
