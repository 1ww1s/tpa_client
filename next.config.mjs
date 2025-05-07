/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
    images: {
      domains: [
        process.env.NEXT_PUBLIC_SERVER_HOST
      ],
      minimumCacheTTL: 60
    },
  };

export default nextConfig;
