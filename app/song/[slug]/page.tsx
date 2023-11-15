export function generateMetadata({ params }: any) {
  const { slug } = params;
  return {
    title: `歌曲详情 - ${slug}`,
  };
}

export default function Page({ params }: any) {
  const { slug } = params;
  return (
    <div className="">
      <h1>歌曲详情</h1>
      <div>id: {slug}</div>
      coming ...
    </div>
  );
}
