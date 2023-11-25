/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  crossOrigin: 'anonymous',
  // https://github.com/vercel/next.js/discussions/34810
  // https://nextjs.org/docs/architecture/nextjs-compiler
  // compiler: {
  //   removeConsole:
  //     process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  // },
  // / -> /home
  // redirects: { },
  experimental: {
    serverComponentsExternalPackages: ['NeteaseCloudMusicApi'],
  },
  images: {
    unoptimized: process.env.NODE_ENV === 'production' && true, // banner 消耗额度过快
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
