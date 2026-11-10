'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

import {
  useSongDetailData,
  useArtistData,
  useSiMiSong,
  useSongComment,
  useArtistMV
} from '~lib/hooks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~components/ui/tabs';
import SongCommentTab from '~components/SongCommentTab';
import Link from 'next/link';

import Spinner from '~components/Spinner';
import MV from '~components/Video/MV';
import SkeletonSongComment from './ui/CommentSkeleton';
import SkeletonSongs from './ui/SkeletonSongs';
import SidebarSearchMusic from './SidebarSearchMusic';
import { toQueueSong } from '~lib/playlist-queue';
import { useMusicStore } from '~lib/store';

import { LoginAnonymous } from './Login/anonymous';

export const ArtistMVS = ({ slug }: { slug: string }) => {
  const { error, data: songData, isLoading } = useSongDetailData(slug);

  const arId = songData?.songs[0].ar?.[0].id;
  const { data: artistMVs, isLoading: isloadingMv } = useArtistMV(arId!);
  if (error) {
    return null;
  }

  if (isloadingMv || isLoading) {
    return <Spinner />;
  }

  return <MV data={artistMVs?.mvs!} />;
};

// TODO: 点击链接后，路由没有发生变化，所以 aplayer 不会自动卸载，之后即使切换路由也不会自动卸载
export const SimiSong = ({ slug }: { slug: string }) => {
  const { data, isLoading } = useSiMiSong(slug);
  const playSong = useMusicStore.use.playSong();
  const songs = data?.songs ?? [];
  const queue = songs.map((song) => toQueueSong(song));

  return (
    <div className="mt-4">
      {isLoading ? (
        <SkeletonSongs count={8} />
      ) : (
        <ul className="columns-1 md:columns-2">
          {songs.map((song, index) => {
            return (
              <li key={song.id} className="mt-0">
                <button
                  type="button"
                  className="text-left hover:text-[var(--brand)]"
                  onClick={() => {
                    const target = queue[index];
                    if (!target) return;
                    playSong(target, queue);
                  }}
                >
                  {song.name} -- {song.artists?.[0].name}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export const ArtistInfo = ({ slug }: { slug: string }) => {
  const { data: songData } = useSongDetailData(slug);
  const arId = songData?.songs?.[0].ar?.[0].id;

  const { data: artistData, isLoading: isloadingArtist } = useArtistData(arId!);

  return (
    <div className="my-4">
      {artistData?.data && (
        <div>
          <h2 className="my-2">歌手简介</h2>
          <Link
            title="点击查看具体详情"
            href={`/artist/${artistData?.data?.artist?.id}`}
            className="no-underline font-bold"
          >
            {artistData?.data.artist?.name}
          </Link>
          <p className="my-2">{artistData?.data.artist?.briefDesc}</p>
        </div>
      )}
    </div>
  );
};

export const SongComment = ({ slug }: { slug: string }) => {
  const { data, isLoading } = useSongComment(slug);
  if (isLoading) {
    return <SkeletonSongComment count={5} />;
  }
  return (
    <div>
      <p className="my-2 text-sm text-muted-foreground">
        共 {data?.total?.toLocaleString() || 0} 条评论
      </p>
      <SongCommentTab songComment={data as ISongComment} />
    </div>
  );
};

function PlayInBar({ id }: { id: string }) {
  const { data } = useSongDetailData(id);
  const playSong = useMusicStore.use.playSong();
  const started = useRef('');

  useEffect(() => {
    const song = data?.songs?.[0];
    if (!song || started.current === String(song.id)) return;
    started.current = String(song.id);
    playSong(toQueueSong(song));
  }, [data, playSong]);

  return null;
}

export default function SongPage() {
  const params = useSearchParams();
  const id = params.get('id');

  if (!id) {
    return <SidebarSearchMusic />;
  }

  return (
    <>
      <LoginAnonymous />
      <PlayInBar id={id} />
      <Tabs defaultValue="artist" className="mt-8">
        <TabsList className="max-w-full justify-start overflow-x-auto">
          <TabsTrigger value="artist">歌手信息</TabsTrigger>
          <TabsTrigger value="similar">相似歌曲</TabsTrigger>
          <TabsTrigger value="comment">评论区</TabsTrigger>
          <TabsTrigger value="mv">歌手 MV</TabsTrigger>
        </TabsList>
        <TabsContent value="artist" className="pt-2">
          <ArtistInfo slug={id} />
        </TabsContent>
        <TabsContent value="similar" className="pt-2">
          <SimiSong slug={id} />
        </TabsContent>
        <TabsContent value="comment" className="pt-2">
          <SongComment slug={id} />
        </TabsContent>
        <TabsContent value="mv" className="pt-2">
          <ArtistMVS slug={id} />
        </TabsContent>
      </Tabs>
    </>
  );
}
