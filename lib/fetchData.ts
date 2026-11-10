import chalk from 'chalk';

type Params = Record<string, any>;
type Config = {
  url?: string;
  params?: Params;
  options?: RequestInit;
};

const DEFAULT_MUSIC_API = 'http://127.0.0.1:3001';

export function getMusicApiBase() {
  const fromEnv = process.env.NEXT_PUBLIC_MUSIC_API?.trim();
  return fromEnv || DEFAULT_MUSIC_API;
}

function addParams(
  finalURL: string,
  params?: Record<string, string | number | boolean>
): string {
  let apiURL = finalURL;
  if (params) {
    if (!Object.prototype.hasOwnProperty.call(params, 'realIp')) {
      const realIp = process.env.NEXT_PUBLIC_REALIP?.trim();
      if (realIp) {
        params.realIp = realIp;
      }
    }
    const queryString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');
    if (queryString) {
      apiURL += `?${queryString}`;
    }
  }

  return apiURL;
}

// https://github.com/vercel/next.js/discussions/48324
async function fetchData(
  finalURL: string,
  params?: Params,
  options?: RequestInit
): Promise<any> {
  const defaultOptions: RequestInit = {
    credentials: 'include',
    mode: 'cors',
    next: {
      revalidate: 3600
    },
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const mergedOptions: RequestInit = { ...defaultOptions, ...options };
  const urlWithParams = addParams(finalURL, params);

  if (!URL.canParse(urlWithParams)) {
    console.error('Invalid music API URL:', urlWithParams);
    return null;
  }

  console.log(
    chalk.green(finalURL),
    params ? chalk.cyan.bold(JSON.stringify(params)) : '',
    new Date().toLocaleTimeString()
  );

  try {
    const res = await fetch(urlWithParams, mergedOptions);
    if (!res.ok) {
      console.error(
        `Music API ${res.status} ${res.statusText}:`,
        urlWithParams
      );
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error('Error in fetchData:', error);
    return null;
  }
}

export const create = (baseURL?: string) => {
  return (config: Config): Promise<any> => {
    const { url, params, options } = config;
    const base = (baseURL || getMusicApiBase()).replace(/\/$/, '');
    const finalURL = url ? `${base}${url}` : base;
    return fetchData(finalURL, params, options);
  };
};

export const musicApiBase = getMusicApiBase();

export const customfetch = create();
