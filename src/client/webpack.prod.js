const { merge } = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const common = require('./webpack.common.js')
const Dotenv = require('dotenv-webpack')

module.exports = merge(common, {
    mode: 'production',
    plugins: [new CompressionPlugin(), new Dotenv()],
    performance: {
        hints: 'warning',
    },
})
