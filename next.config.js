/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'avatars.dicebear.com'],
  },
  experimental: {
    urlImports: ['https://cdn.skypack.dev'],
  },
}

module.exports = nextConfig
