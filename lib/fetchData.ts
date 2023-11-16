import { createApiUrl } from './createApiUrl';

// https://github.com/vercel/next.js/discussions/48324
export async function fetchData<T>({
  url,
  params,
  options,
}: {
  url: string;
  params?: Record<string, string | number | boolean>;
  options?: RequestInit;
}): Promise<T> {
  const defaultOptions: RequestInit = {
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' }, // cookie on header auto???
  };
  const mergedOptions: RequestInit = { ...defaultOptions, ...options };
  const urlWithParams = createApiUrl(url, params);

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
