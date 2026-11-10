'use client';

import { useSyncExternalStore } from 'react';
import useSWRImmutable from 'swr/immutable';
import PlaylistDetail from '~components/playlist/PlaylistDetail';
import { getPlaylistView } from '~lib/api/playlist';
import { isAccountCookie } from '~lib/cookie';
import { useCookie } from '~lib/hooks/useCookie';
import type { PlaylistDetailData } from '~lib/playlist-view';
import { useMusicStore } from '~lib/store';

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

const TRACK_CAP = 500;

function missingTracks(data: PlaylistDetailData, uid?: number) {
  const expected = Math.min(Math.max(data.trackCount || 0, 0), TRACK_CAP);
  if (expected === 0 || data.tracks.length >= expected) return false;
  if (data.tracks.length === 0) return true;
  return uid != null && data.creator?.userId === uid;
}

export default function PlaylistAuthed({
  playlistId,
  initial
}: {
  playlistId: number;
  initial: PlaylistDetailData | null;
}) {
  const cookie = useCookie();
  const hydrated = useHydrated();
  const uid = useMusicStore.use.userInfo()?.profile?.userId;
  const accountCookie = isAccountCookie(cookie);
  const refetch = accountCookie && (!initial || missingTracks(initial, uid));
  const { data, isLoading } = useSWRImmutable(
    refetch ? ['playlist-view', playlistId, cookie] : null,
    () => getPlaylistView(playlistId, cookie)
  );

  const view = data === undefined ? initial : (data ?? initial);

  if (view) return <PlaylistDetail data={view} />;

  if (!hydrated || isLoading) {
    return (
      <div className="my-8 text-center text-muted-foreground">歌单加载中</div>
    );
  }

  return (
    <div className="my-8 text-center text-muted-foreground">
      歌单加载失败，请稍后重试
    </div>
  );
}
