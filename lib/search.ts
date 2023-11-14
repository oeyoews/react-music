const baseurl = process.env.MUSIC_API;

export async function getMusicURL(id: number): Promise<MusicURL> {
  const res = await fetch(`${baseurl}/song/url?id=${id}`, {
    credentials: 'include',
  });
  const data = await res.json();
  return data;
}

export async function getPlayList(id: number): Promise<PlayListDetails> {
  const res = await fetch(`${baseurl}/playlist/detail?id=${id}`, {
    credentials: 'include',
  });
  const data = await res.json();
  return data;
}

/**
 * Searches for a specific set of keywords.
 *
 * @param {string} keywords - The keywords to search for.
 * @return {Promise<Search>} - A promise that resolves to the search results.
 */
export async function search(keywords: string): Promise<Search> {
  const res = await fetch(`${baseurl}/search?keywords=${keywords}`, {
    credentials: 'include',
  });
  const data = await res.json();
  return data;
}

/**
 * Searches for the top songs of an artist based on their ID.
 *
 * @param {number} id - The ID of the artist.
 * @return {Promise<SearchTop>} A Promise that resolves to the top songs data.
 */
export async function searchTop(id: number): Promise<SearchTop> {
  const res = fetch(`${baseurl}/artist/top/song?id=${id}`, {
    credentials: 'include',
  });
  const data = (await res).json();
  return data;
}
