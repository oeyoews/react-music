'use client';

import { useSearchParams } from 'next/navigation';

import DrawserComponent from '~components/DrawserComponent';
import {
  useSongDetailData,
  useArtistData,
  useSiMiSong,
  useSongComment,
  useArtistMV
} from '~lib/hooks';
import SongCommentTab from '~components/SongCommentTab';
import Link from 'next/link';

import Spinner from '~components/Spinner';
import MV from '~components/Video/MV';
import SkeletonSongComment from './ui/CommentSkeleton';
import SkeletonSongs from './ui/SkeletonSongs';
import SidebarSearchMusic from './SidebarSearchMusic';
import ReactMusicPlayer from './Player/ReactMusicPlayer';
import { useMusicStore } from '~lib/store';

import dynamic from 'next/dynamic';
import { LoginAnonymous } from './Login/anonymous';

const APlayer = dynamic(() => import('./Player/APlayer'), { ssr: false });

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
  return (
    <div className="mt-4">
      <hr />
      <h2 className="my-2">相似歌曲</h2>
      {isLoading ? (
        <SkeletonSongs count={8} />
      ) : (
        <ul className="columns-1 md:columns-2">
          {data?.songs?.map((song) => {
            return (
              <li key={song.id} className="mt-0">
                <Link href={`/song?id=${song.id}`} className="no-underline">
                  {song.name} -- {song.artists?.[0].name}
                </Link>
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
      <div className="flex justify-start items-center space-x-2">
        <h2 className="my-2">评论区</h2>
        <div>共 {data?.total?.toLocaleString() || 0} 条评论</div>
      </div>
      <SongCommentTab songComment={data as ISongComment} />
    </div>
  );
};

export default function SongPage() {
  const params = useSearchParams();
  const id = params.get('id');
  const player = useMusicStore.use.player();
  const togglePlayer = useMusicStore.use.togglePlayer();

  if (!id) {
    return <SidebarSearchMusic />;
  }

  // TODO: player 组件卸载
  // NOTE: app-index.js:32 Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
  return (
    <>
      <LoginAnonymous />
      <div className="space-x-2 my-4 flex justify-center items-center">
        {/* <Button className="font-bold capitalize" onClick={togglePlayer}>
          Toggle Player
        </Button> */}
        <DrawserComponent text="歌手信息" className="shrink">
          <ArtistInfo slug={id} />
        </DrawserComponent>
        <DrawserComponent text="相似歌曲">
          <SimiSong slug={id} />
        </DrawserComponent>
        <DrawserComponent text="评论区">
          <SongComment slug={id} />
        </DrawserComponent>
        <DrawserComponent text="歌手MV">
          <ArtistMVS slug={id} />
        </DrawserComponent>
      </div>
      {/* <APlayer slug={id} /> */}
      {player === 'cloud' ? (
        <APlayer slug={id} />
      ) : (
        <ReactMusicPlayer id={id} />
      )}
    </>
  );
}
