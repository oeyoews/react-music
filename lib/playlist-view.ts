export type PlaylistTrackItem = {
  id: number;
  name: string;
  artists: { id: number; name: string }[];
  albumId?: number;
  albumName?: string;
  cover?: string;
  duration?: number;
  vip: boolean;
  sq: boolean;
};

export type PlaylistPerson = {
  userId: number;
  nickname: string;
  avatarUrl?: string;
  signature?: string;
};

export type PlaylistDetailData = {
  id: number;
  name: string;
  description?: string;
  tags: string[];
  cover?: string;
  playCount?: number;
  subscribedCount: number;
  commentCount: number;
  trackCount: number;
  createTime?: number;
  creator?: PlaylistPerson;
  tracks: PlaylistTrackItem[];
  subscribers: PlaylistPerson[];
  comments: ISongComment | null;
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

type RawPerson = {
  userId?: number;
  nickname?: string;
  avatarUrl?: string;
  signature?: string;
};

function toPerson(user?: RawPerson | null): PlaylistPerson | null {
  if (!user?.userId || !user.nickname) return null;
  return {
    userId: user.userId,
    nickname: user.nickname,
    avatarUrl: user.avatarUrl,
    signature: user.signature || undefined
  };
}

function toTrack(
  song: RawTrack,
  vipIds: Set<number>
): PlaylistTrackItem | null {
  if (!song.id || !song.name) return null;
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
    vip: vipIds.has(song.id) || song.fee === 1,
    sq: song.sq != null
  };
}

export function buildPlaylistDetail(input: {
  musicdata: IPlayListDetails | null;
  allTracksData: PlaylistSong | null;
  playListComment: ISongComment | null;
  subscribersData: {
    subscribers?: RawPerson[];
    total?: number;
  } | null;
}): PlaylistDetailData | null {
  const playlist = input.musicdata?.playlist;
  if (!playlist) return null;

  const rawSongs = (
    input.allTracksData?.songs?.length
      ? input.allTracksData.songs
      : (playlist.tracks ?? [])
  ) as RawTrack[];
  const privileges =
    (input.allTracksData?.songs?.length
      ? input.allTracksData.privileges
      : input.musicdata?.privileges) ?? [];
  const vipIds = new Set(
    privileges.filter((item) => item.fee === 1).map((item) => item.id)
  );
  const tracks = rawSongs
    .map((song) => toTrack(song, vipIds))
    .filter((song): song is PlaylistTrackItem => song != null);

  const subscriberSource = (
    input.subscribersData?.subscribers?.length
      ? input.subscribersData.subscribers
      : (playlist.subscribers ?? [])
  ) as RawPerson[];
  const description = playlist.description?.replace(/\s+/g, ' ').trim();

  return {
    id: playlist.id,
    name: playlist.name,
    description: description || undefined,
    tags: playlist.tags ?? [],
    cover: playlist.coverImgUrl,
    playCount: playlist.playCount,
    subscribedCount: Math.max(
      playlist.subscribedCount ?? 0,
      input.subscribersData?.total ?? 0
    ),
    commentCount: input.playListComment?.total ?? playlist.commentCount ?? 0,
    trackCount: playlist.trackCount || tracks.length,
    createTime: playlist.createTime,
    creator: toPerson(playlist.creator) ?? undefined,
    tracks,
    subscribers: subscriberSource
      .map((person) => toPerson(person))
      .filter((person): person is PlaylistPerson => person != null),
    comments: input.playListComment ?? null
  };
}
