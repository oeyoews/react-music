// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#convention
import app from 'NeteaseCloudMusicApi';
import chalk from 'chalk';

// export const runtime = 'edge'; // 'nodejs' is the default, edge no fs

interface Params {
  slug: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const { slug } = params;

  console.log(
    chalk.cyan.bold.underline(request.url, '->', new Date().toLocaleString()),
  );

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id') || 1;
  const type = searchParams.get('type') || 1;

  // params
  // console.log(id, type);

  let data;

  switch (slug) {
    case 'banner':
      // @ts-ignore
      data = await app.banner({ type });
      break;
    case 'starpick':
      // @ts-ignore
      data = await app.starpick_comments_summary();
      break;
    case 'personalized':
      data = await app.personalized({ limit: 10 });
      break;
    case 'top_playlist':
      data = await app.top_playlist({
        limit: 10,
      });
      break;
    case 'mv_detail':
      data = await app.mv_detail({
        mvid: id,
      });
      break;
    case 'mv_comment':
      data = await app.comment_mv({
        id,
        limit: 99,
      });
      break;
    case 'artist_detail':
      data = await app.artist_detail({
        id,
      });
      break;
    case 'recommend_songs':
      data = await app.recommend_songs({});
  }

  // 支持跨域
  return Response.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
