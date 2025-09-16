/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        typedRoutes: true,
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
            },
            {
                protocol: 'https',
                hostname: '**.sirv.com',
            },
        ],
    },
};

export default nextConfig;
