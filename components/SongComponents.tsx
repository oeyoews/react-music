'use client';

import DrawserComponent from '~components/DrawserComponent';
import {
  useSongDetailData,
  useArtistData,
  useSiMiSong,
  useSongComment,
  useArtistMV,
} from '~lib/hooks';
import SongCommentTab from '~components/SongCommentTab';
import Link from 'next/link';

import Spinner from '~components/Spinner';
import MV from '~components/Video/MV';
import dynamic from 'next/dynamic';
import APlayer from './Player/APlayer';

// const APlayer = dynamic(() => import('~components/Player/APlayer'), {
//   ssr: false,
// });

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

export const SimiSong = ({ slug }: { slug: string }) => {
  const { data, isLoading } = useSiMiSong(slug);
  return (
    <div className="mt-4">
      <hr />
      <h2 className="my-2">相似歌曲</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className="columns-2">
          {data?.songs?.map((song) => {
            return (
              <li key={song.id}>
                <Link href={`/song/${song.id}`} className="no-underline">
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
            className="no-underline font-bold">
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
  return (
    <div>
      <div className="flex justify-start items-center space-x-2">
        <h2 className="my-2">评论区</h2>
        <div>共 {data?.total?.toLocaleString() || 0} 条评论</div>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <SongCommentTab songComment={data as ISongComment} />
      )}
    </div>
  );
};

export default function SongPage({ slug }: { slug: string }) {
  return (
    <>
      <div className="space-x-2 my-4">
        <APlayer slug={slug} />
        <DrawserComponent text="查看歌手信息">
          <ArtistInfo slug={slug} />
        </DrawserComponent>
        <DrawserComponent text="查看相似歌曲">
          <SimiSong slug={slug} />
        </DrawserComponent>
        <DrawserComponent text="查看评论区">
          <SongComment slug={slug} />
        </DrawserComponent>
        <DrawserComponent text="查看歌手MV">
          <ArtistMVS slug={slug} />
        </DrawserComponent>
      </div>
    </>
  );
}
