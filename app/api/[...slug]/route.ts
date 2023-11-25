// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#convention
import app from 'NeteaseCloudMusicApi';
import chalk from 'chalk';

// export const runtime = 'edge'; // 'nodejs' is the default, edge no fs

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } },
) {
  const slug = params.slug?.join('_');
  const { searchParams } = new URL(request.url);
  const cookie = searchParams.get('cookie');
  let url = request.url;
  if (cookie) {
    url = request.url.replace(encodeURIComponent(cookie), 'xxxxxxxx(hiddened)');
  }

  console.log(
    chalk.cyan.bold.underline(url, '->', new Date().toLocaleString()),
  );

  const id = searchParams.get('id') || 1;
  const type = searchParams.get('type') || 1;

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
    case 'starpick_comments_summary':
      // @ts-ignore
      data = await app.starpick_comments_summary();
      break;
    // TODO: 不知道为什么总是得到推荐歌单
    case 'recommend_songs':
      data = await app.recommend_songs({});
    case 'personalized':
      data = await app.personalized({ limit: 10 });
      break;
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
