import { customfetch as fetch } from '~lib/fetchData';

export default async function page() {
  const data = await fetch({
    url: '/recommend/songs',
  });
  console.log(data);
  return <div>{JSON.stringify(data)}</div>;
}
