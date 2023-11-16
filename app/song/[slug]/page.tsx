import { checkSong, getLyric, getMusicURL, getSongDetail } from '~lib/search';
import AudioSong from '~app/ui/AudioSong';

async function getSongInfo(slug: string) {
  const songdetail = await getSongDetail(Number(slug));
  return songdetail.songs[0];
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = params;
  const { name } = await getSongInfo(slug);
  return {
    title: `歌曲详情 - ${name}`,
  };
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = params;
  const songInfo = await getSongInfo(slug);
  const musicData = await getMusicURL(Number(slug));
  const musicInfo = musicData.data[0];
  const isAvailable = await checkSong(songInfo.id);
  const { lrc } = await getLyric(Number(slug));

  return (
    <div className="my-2">
      <h1>
        歌曲详情 - {songInfo.name} {songInfo.id}{' '}
      </h1>
      {/* <div>音质: {musicInfo.level}</div> */}
      {/* TODO: 仍然不起作用, 部分歌曲403, 暂时采用outer */}
      <AudioSong
        // src={musicInfo.url}
        isAvailable={isAvailable}
        songInfo={songInfo}
        lrc={lrc}
      />
    </div>
  );
}
