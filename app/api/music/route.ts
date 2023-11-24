import app from 'NeteaseCloudMusicApi';

export async function POST(request: Request) {
  const res = await request.json();

  const data = await app.banner({ type: 1 });

  const banners = data.body.banners;

  return Response.json({ banners });
}
