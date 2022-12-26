const withReactSvg = require('next-react-svg')
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    include: [
        path.resolve(__dirname, 'src/assets/svg'),
        path.resolve(__dirname, 'src/assets/icons'),
    ],
    reactStrictMode: false,
    swcMinify: true,
    images: {
        domains: ['lh3.googleusercontent.com', 'pbs.twimg.com'],
    },
}

module.exports = withReactSvg(nextConfig)
