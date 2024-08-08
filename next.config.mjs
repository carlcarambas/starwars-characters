/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'starwars-visualguide.com' },
    ],
  },
}

export default nextConfig;
