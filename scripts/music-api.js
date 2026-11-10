const fs = require('fs');
const os = require('os');
const path = require('path');

async function start() {
  const tokenFile = path.resolve(os.tmpdir(), 'anonymous_token');
  if (!fs.existsSync(tokenFile)) {
    fs.writeFileSync(tokenFile, '', 'utf-8');
  }

  const apiRoot = path.dirname(
    require.resolve('NeteaseCloudMusicApi/package.json')
  );
  const generateConfig = require(path.join(apiRoot, 'generateConfig'));
  await generateConfig();

  const { serveNcmApi } = require(path.join(apiRoot, 'server'));
  const port = Number(process.env.MUSIC_API_PORT || 3001);
  await serveNcmApi({
    checkVersion: false,
    port,
    host: '127.0.0.1'
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
