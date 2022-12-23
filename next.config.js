/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'weeout01-storage-2ebbc512161600-main.s3.us-east-1.amazonaws.com',
        pathname: '/public/**',
      },
    ],
  },
}

module.exports = nextConfig
