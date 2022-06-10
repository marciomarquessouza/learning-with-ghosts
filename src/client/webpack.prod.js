const { merge } = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'production',
    plugins: [new CompressionPlugin()],
    performance: {
        hints: 'warning',
    },
})
