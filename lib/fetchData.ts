type Config = {
  url?: string;
  params?: Record<string, string | number | boolean>;
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
    // if (!params.hasOwnProperty('timestamp')) {
    //   params.timestamp = Date.now();
    // }
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
  params?: Record<string, string | number | boolean>,
  options?: RequestInit,
): Promise<any> {
  const defaultOptions: RequestInit = {
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' }, // cookie on header auto???
  };
  const mergedOptions: RequestInit = { ...defaultOptions, ...options };
  const urlWithParams = addParams(finalURL, params);

  try {
    const response = await fetch(urlWithParams, mergedOptions);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchData:', error);
    throw error;
  }
}

export const create = (baseURL: string) => {
  return (config: Config): Promise<any> => {
    const { url, params, options } = config;
    const finalURL = url ? baseURL + url : baseURL;
    return fetchData(finalURL, params, options);
  };
};
