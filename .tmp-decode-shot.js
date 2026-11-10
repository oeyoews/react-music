const fs = require('fs');
const j = JSON.parse(
  fs.readFileSync(
    'C:/Users/29563/.cursor/browser-logs/cdp-response-Page.captureScreenshot-2026-11-10T16-29-00-533Z.json',
    'utf8'
  )
);
const data = j.data || j.result?.data || j.result?.result?.data;
if (!data) {
  console.log(Object.keys(j));
  process.exit(1);
}
const buf = Buffer.from(data, 'base64');
fs.writeFileSync('D:/APP/react-music/.tmp-featured.png', buf);
console.log('bytes', buf.length);
