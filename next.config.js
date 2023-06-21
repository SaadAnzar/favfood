/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [{ key: 'Cross-Origin-Opener-Policy', value: 'same-origin' }],
      },
    ]
  },
  images: {
    domains: ['www.themealdb.com', 'lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig
