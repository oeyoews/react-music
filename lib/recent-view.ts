import type { PlaylistTrackItem } from '~lib/playlist-view';

export type RecentSongItem = PlaylistTrackItem & {
  playedAt?: number;
  rowKey: string;
};

export type RecentResourceItem = {
  id: number;
  name: string;
  cover?: string;
  subtitle?: string;
  href?: string;
  playedAt?: number;
  rowKey: string;
};

export type RecentTabCounts = {
  song: number;
  dj: number;
  voice: number;
  playlist: number;
  album: number;
};

export type RecentViewData = {
  songs: RecentSongItem[];
  dj: RecentResourceItem[];
  voice: RecentResourceItem[];
  playlists: RecentResourceItem[];
  albums: RecentResourceItem[];
  counts: RecentTabCounts;
};

type RawTrack = {
  id?: number;
  name?: string;
  ar?: { id?: number; name?: string }[];
  al?: { id?: number; name?: string; picUrl?: string };
  dt?: number;
  fee?: number;
  sq?: unknown;
};

type RawRecentRow = {
  playTime?: number;
  data?: Record<string, unknown> & Partial<RawTrack>;
  song?: RawTrack;
  resource?: { data?: RawTrack };
};

export type RecentListPayload = {
  data?: {
    total?: number;
    list?: RawRecentRow[];
  };
  code?: number;
} | null;

function trackFromRow(row: RawRecentRow): RawTrack | null {
  const nested = row.data as RawTrack | undefined;
  if (nested?.id && nested.name) return nested;
  if (row.song?.id && row.song.name) return row.song;
  if (row.resource?.data?.id && row.resource.data.name)
    return row.resource.data;
  return null;
}

function toSongItem(row: RawRecentRow, index: number): RecentSongItem | null {
  const song = trackFromRow(row);
  if (!song?.id || !song.name) return null;
  const playTime = row.playTime;
  return {
    id: song.id,
    name: song.name,
    artists: (song.ar ?? [])
      .filter((artist) => artist.name)
      .map((artist) => ({
        id: artist.id ?? 0,
        name: artist.name as string
      })),
    albumId: song.al?.id,
    albumName: song.al?.name,
    cover: song.al?.picUrl,
    duration: song.dt,
    vip: song.fee === 1,
    sq: song.sq != null,
    playedAt: playTime && playTime > 0 ? playTime : undefined,
    rowKey: `${song.id}-${playTime ?? index}`
  };
}

function rowCount(payload: RecentListPayload) {
  const total = payload?.data?.total;
  if (typeof total === 'number' && total >= 0) return total;
  return payload?.data?.list?.length ?? 0;
}

function pickString(source: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return undefined;
}

function pickNumber(source: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'number' && Number.isFinite(value)) return value;
  }
  return undefined;
}

function resourceFromRow(
  row: RawRecentRow,
  index: number,
  kind: 'playlist' | 'album' | 'dj' | 'voice'
): RecentResourceItem | null {
  const data = (row.data ?? {}) as Record<string, unknown>;
  const id = pickNumber(data, ['id', 'resourceId']);
  const name = pickString(data, ['name', 'title', 'djName']);
  if (!id || !name) return null;

  const playTime = row.playTime;
  const cover =
    pickString(data, ['coverImgUrl', 'picUrl', 'coverUrl', 'imgUrl', 'pic']) ??
    undefined;

  let subtitle: string | undefined;
  let href: string | undefined;

  if (kind === 'playlist') {
    const creator = data.creator as { nickname?: string } | undefined;
    subtitle = creator?.nickname;
    href = `/playlist/${id}`;
  } else if (kind === 'album') {
    const artists = data.artists as { name?: string }[] | undefined;
    const ar = data.ar as { name?: string }[] | undefined;
    subtitle = (artists ?? ar)
      ?.map((item) => item.name)
      .filter(Boolean)
      .join(' / ');
    href = `/album/${id}`;
  } else if (kind === 'dj') {
    subtitle = pickString(data, ['desc', 'description']);
    href = `/search?searchWord=${encodeURIComponent(name)}`;
  } else {
    subtitle = pickString(data, ['djName', 'mainTrackName']);
    href = `/search?searchWord=${encodeURIComponent(name)}`;
  }

  return {
    id,
    name,
    cover,
    subtitle,
    href,
    playedAt: playTime && playTime > 0 ? playTime : undefined,
    rowKey: `${kind}-${id}-${playTime ?? index}`
  };
}

export function buildRecentSongs(payload: RecentListPayload): RecentSongItem[] {
  const list = payload?.data?.list ?? [];
  return list
    .map((row, index) => toSongItem(row, index))
    .filter((item): item is RecentSongItem => item != null);
}

export function buildRecentResources(
  payload: RecentListPayload,
  kind: 'playlist' | 'album' | 'dj' | 'voice'
): RecentResourceItem[] {
  const list = payload?.data?.list ?? [];
  return list
    .map((row, index) => resourceFromRow(row, index, kind))
    .filter((item): item is RecentResourceItem => item != null);
}

export function buildRecentView(input: {
  songs: RecentListPayload;
  dj: RecentListPayload;
  voice: RecentListPayload;
  playlists: RecentListPayload;
  albums: RecentListPayload;
}): RecentViewData {
  const songItems = buildRecentSongs(input.songs);
  return {
    songs: songItems,
    dj: buildRecentResources(input.dj, 'dj'),
    voice: buildRecentResources(input.voice, 'voice'),
    playlists: buildRecentResources(input.playlists, 'playlist'),
    albums: buildRecentResources(input.albums, 'album'),
    counts: {
      song: rowCount(input.songs) || songItems.length,
      dj: rowCount(input.dj),
      voice: rowCount(input.voice),
      playlist: rowCount(input.playlists),
      album: rowCount(input.albums)
    }
  };
}
