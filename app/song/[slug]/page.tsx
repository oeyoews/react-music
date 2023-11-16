import { getMusicURL, getSongDetail } from '~lib/search';
import AudioSong from '~app/ui/AudioSong';

// async function getSongInfo(slug: string) {
//   const songdetail = await getSongDetail(Number(slug));
//   return songdetail.songs[0];
// }

// export async function generateMetadata({ params }: { params: Params }) {
//   const { slug } = params;
//   const { name } = await getSongInfo(slug);
//   return {
//     title: `歌曲详情 - ${name}`,
//   };
// }

export default async function Page({ params }: { params: Params }) {
  const { slug } = params;
  const songInfo = await getSongDetail(Number(slug));
  const musicData = await getMusicURL(Number(slug));
  return (
    <div className="my-2">
      <h1>歌曲详情 - {songInfo.songs?.[0].name} </h1>
      <div>音质: {musicData.data[0].level}</div>
      <div className="flex justify-center items-center">
        {<AudioSong src={musicData.data[0].url} />}
      </div>
    </div>
  );
}
