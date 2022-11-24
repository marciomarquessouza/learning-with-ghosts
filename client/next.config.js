/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        domains: ['lh3.googleusercontent.com', 'pbs.twimg.com'],
    },
}

module.exports = nextConfig
