/** @type {import('next').NextConfig} */

const allowedImageWordPressDomain = new URL( process.env.NEXT_PUBLIC_WP_API ).hostname;

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.williamusic.com',
      },
      {
        protocol: 'https',
        hostname: allowedImageWordPressDomain,
      },
      {
        protocol: 'https',
        hostname: '**.placeholder.com',
      },
    ]
  },
}