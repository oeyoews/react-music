export default function VideoPage({ params }: { params: Params }) {
  const { slug } = params;
  return <div>{slug}</div>;
}
