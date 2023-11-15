// https://github.com/vercel/next.js/discussions/48324
export async function fetchData<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const defaultOptions: RequestInit = { credentials: 'include' };
  const mergedOptions: RequestInit = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, mergedOptions);

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
