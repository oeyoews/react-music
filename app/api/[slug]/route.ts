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

  const searchData = await app.search({
    keywords: res.keywords,
  });

  const mvDetailData = (await app.mv_detail({
    mvid: res.mvid,
  })) as unknown as { status: number; body: IMvDetail };

  let data;

  if (slug === 'recommend_songs') {
    data = recommendSongs.body as unknown as IRecommendSongs;
  }

  if (slug === 'artist_detail') {
    data = artistDetailData.body as unknown as IArtistDetail;
  }

  if (slug === 'search') {
    data = searchData.body as unknown as ISearch;
  }

  if (slug === 'mv_detail') {
    data = mvDetailData.body;
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
