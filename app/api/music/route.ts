import app from 'NeteaseCloudMusicApi';

export async function GET() {
  const res = await app.banner({ type: 1 });
  const banners = res.body.banners;
  return new Response(JSON.stringify(banners));
}
