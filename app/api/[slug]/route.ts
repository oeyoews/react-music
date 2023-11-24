import app from 'NeteaseCloudMusicApi';

// export const runtime = 'edge'; // 'nodejs' is the default

interface Params {
  slug: string;
}

export async function POST(request: Request, { params }: { params: Params }) {
  const { slug } = params;
  console.log(slug);
  const res = await request.json();

  const recommendSongs = await app.recommend_songs({
    cookie: res.cookie,
  });

  let data;

  if (slug === 'recommend_songs') {
    data = recommendSongs.body;
  }

  // 支持跨域
  return Response.json(
    { data },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    },
  );
}
