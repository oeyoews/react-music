import { getMusicURL, getSongDetail } from '~lib/search';

async function getSongInfo(slug: string) {
  const songdetail = await getSongDetail(Number(slug));
  return songdetail.songs[0];
}

export async function generateMetadata({ params }: any) {
  const { slug } = params;
  const { name } = await getSongInfo(slug);
  return {
    title: `歌曲详情 - ${name}`,
  };
}

export default async function Page({ params }: any) {
  const { slug } = params;
  const musicdata = await getMusicURL(slug);
  const { name } = await getSongInfo(slug);
  return (
    <div className="my-2">
      <h1>歌曲详情 - {name} </h1>
      <div>音质: {musicdata.data[0].level}</div>
      <div className="flex justify-center items-center">
        <audio controls>
          <source src={musicdata.data[0].url} />
        </audio>
      </div>
    </div>
  );
}
