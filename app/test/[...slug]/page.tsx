export default function page({ params }: { params: { slug: [] } }) {
  return <div>{params.slug?.join('_')}</div>;
}
