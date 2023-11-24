import app from 'NeteaseCloudMusicApi';

// export const runtime = 'edge'; // 'nodejs' is the default, edge no fs

interface Params {
  slug: string;
}

export async function POST(request: Request, { params }: { params: Params }) {
  const res = await request.json();

  const { slug } = params;

  const { id, cookie } = res;

  const recommendSongs = await app.recommend_songs({
    cookie,
  });

  const artistDetailData = await app.artist_detail({
    id,
  });

  let data;

  if (slug === 'recommend_songs') {
    data = recommendSongs.body as unknown as IRecommendSongs;
  }

  if (slug === 'artist_detail') {
    data = artistDetailData.body as unknown as IArtistDetail;
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
