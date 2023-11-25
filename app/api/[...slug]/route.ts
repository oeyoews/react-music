import { searchDefault } from '~lib/search';
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#convention
import app, { type SoundQualityType } from 'NeteaseCloudMusicApi';
import chalk from 'chalk';

// export const revalidate = process.env.NODE_ENV === 'production' ? 1 : 0;
// export const runtime = 'nodejs'; // 'nodejs' is the default, edge no fs

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

  const id = searchParams.get('id') || '1';
  const type = searchParams.get('type') || 1;
  const ids = searchParams.get('ids');
  const keywords = searchParams.get('keywords');

  let data;

  switch (slug) {
    case 'banner':
      // @ts-ignore
      data = await app.banner({ type });
      break;
    case 'search':
      // @ts-ignore
      data = await app.search({ keywords });
      break;
    case 'search_default':
      data = await app.search_default({});
      break;
    case 'search_hot_detail':
      data = await app.search_hot_detail({});
      break;
    case 'search_default':
      data = await app.search_default({});
      break;
    case 'song_detail':
      data = await app.song_detail({
        ids: ids!,
      });
      break;
    case 'artist_mv':
      data = await app.artist_mv({
        id,
      });
      break;
    case 'comment_music':
      try {
        data = await app.comment_music({ id });
      } catch (e) {
        console.log(chalk.red(slug, '->', e.body.message));
        data = e;
      }
      break;
    case 'song_url':
      try {
        data = await app.song_url({ id });
      } catch (e) {
        console.log(chalk.red(slug, '->', e.body.message));
        data = e;
      }
      break;
    case 'song_url_v1':
      try {
        data = app.song_url_v1({
          id,
          level: 'standard' as SoundQualityType,
        });
      } catch (e) {
        console.log(chalk.red(slug, '->', e.body.message));
        data = e;
      }
      break;
    case 'simi_song':
      data = await app.simi_song({
        id,
      });
      break;
    case 'lyric':
      data = await app.lyric({
        id,
      });
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
    case 'recommend_songs':
      data = await app.recommend_songs({});
      break;
    case 'personalized':
      data = await app.personalized({ limit: 10 });
      break;
    case 'mv_first':
      data = await app.mv_first({});
      break;
    case 'mv_exclusive_rcmd':
      data = await app.mv_exclusive_rcmd({});
      break;
    case 'comment_mv':
      data = await app.comment_mv({
        id,
        limit: 99,
      });
      break;
    default:
      data = { msg: '暂不支持 ' + slug };
      console.log(chalk.red.bold(slug, '暂时不支持'));
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
