import million from 'million/compiler';

const millionConfig = {
  auto: { rsc: true },
};

// /** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.mp3$/,
  //     type: 'asset/resource',
  //     generator: {
  //       filename: 'static/chunks/[path][name].[hash][ext]',
  //     },
  //   });
  //   return config;
  // },
  experimental: {
    ppr: true,
  },
  reactStrictMode: true,
  crossOrigin: 'anonymous',
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // https://github.com/vercel/next.js/discussions/34810
  // https://nextjs.org/docs/architecture/nextjs-compiler
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  // / -> /home
  // redirects: { },
  images: {
    // unoptimized: process.env.NODE_ENV === 'production' && true, // banner 消耗额度过快
    unoptimized: true,
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

export default million.next(nextConfig, millionConfig);
