'use server';

import { create } from '~lib/fetchData';
import {
  buildRecentView,
  type RecentListPayload,
  type RecentViewData
} from '~lib/recent-view';

const fetch = create();

const RECENT_LIMIT = 500;

function withCookie(cookie?: string): RequestInit | undefined {
  const value = cookie?.trim();
  if (!value) return undefined;
  return {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({ cookie: value }),
    next: { revalidate: 0 }
  };
}

function authedParams<T extends Record<string, string | number | boolean>>(
  params: T,
  cookie?: string
) {
  if (!cookie?.trim()) return params;
  return { ...params, timestamp: Date.now() };
}

async function fetchRecentList(
  path: string,
  cookie?: string
): Promise<RecentListPayload> {
  return (await fetch({
    url: path,
    params: authedParams({ limit: RECENT_LIMIT }, cookie),
    options: withCookie(cookie)
  })) as RecentListPayload;
}

/** 登录账号的最近播放（单曲 / 播客 / 声音 / 歌单 / 专辑）。 */
export async function getRecentView(
  cookie?: string
): Promise<RecentViewData | null> {
  if (!cookie?.trim()) return null;

  const [songs, dj, voice, playlists, albums] = await Promise.all([
    fetchRecentList('/record/recent/song', cookie),
    fetchRecentList('/record/recent/dj', cookie),
    fetchRecentList('/record/recent/voice', cookie),
    fetchRecentList('/record/recent/playlist', cookie),
    fetchRecentList('/record/recent/album', cookie)
  ]);

  return buildRecentView({ songs, dj, voice, playlists, albums });
}
