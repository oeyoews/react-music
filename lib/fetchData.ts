type Params = Record<string, any>;
type Config = {
  url?: string;
  params?: Params;
  options?: RequestInit;
};

function addParams(
  finalURL: string,
  params?: Record<string, string | number | boolean>,
): string {
  // 添加参数到 URL
  let apiURL = finalURL;
  if (params) {
    // Include timestamp only if not already present in params
    if (!params.hasOwnProperty('realIp')) {
      params.realIp = process.env.REALIP as string;
    }
    const queryString = Object.keys(params)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
      )
      .join('&');
    apiURL += `?${queryString}`;
  }

  return apiURL;
}

// https://github.com/vercel/next.js/discussions/48324
async function fetchData(
  finalURL: string,
  params?: Params,
  options?: RequestInit,
): Promise<any> {
  const defaultOptions: RequestInit = {
    credentials: 'include',
    mode: 'cors',
    // cache: 'force-cache',
    next: {
      revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600,
    },
    // https://neteasecloudmusicapi-docs.4everland.app/#/?id=%e7%99%bb%e5%bd%95
    headers: {
      'Content-Type': 'application/json',
    }, // cookie on header auto on same domain???
  };
  const mergedOptions: RequestInit = { ...defaultOptions, ...options };
  const urlWithParams = addParams(finalURL, params);

  try {
    const res = await fetch(urlWithParams, mergedOptions);
    const data = await res.json();
    return data.body;
  } catch (error) {
    console.error('Error in fetchData:', error);
    throw error;
  }
}

const create = (baseURL: string) => {
  return (config: Config): Promise<any> => {
    const { url, params, options } = config;
    const finalURL = url ? baseURL + url : baseURL;
    return fetchData(finalURL, params, options);
  };
};

export const customfetch = create(process.env.MUSIC_API as string);
