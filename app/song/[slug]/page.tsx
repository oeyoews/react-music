import SongPage from '~components/SongComponents';

export default function Page({ params }: { params: Params }) {
  const { slug } = params;

  return <SongPage slug={slug} />;
}
