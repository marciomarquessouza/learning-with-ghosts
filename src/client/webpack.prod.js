const { merge } = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CompressionPlugin(),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.REACT_APP_API_KEY': JSON.stringify(process.env.REACT_APP_API_KEY),
            'process.env.REACT_APP_AUTH_DOMAIN': JSON.stringify(process.env.REACT_APP_AUTH_DOMAIN),
            'process.env.REACT_APP_PROJECT_ID': JSON.stringify(process.env.REACT_APP_PROJECT_ID),
            'process.env.REACT_APP_STORAGE_BUCKET': JSON.stringify(
                process.env.REACT_APP_STORAGE_BUCKET
            ),
            'process.env.REACT_APP_MESSAGING_SENDER_ID': JSON.stringify(
                process.env.REACT_APP_MESSAGING_SENDER_ID
            ),
            'process.env.REACT_APP_APP_ID': JSON.stringify(process.env.REACT_APP_APP_ID),
            'process.env.REACT_APP_MEASUREMENT_ID': JSON.stringify(
                process.env.REACT_APP_MEASUREMENT_ID
            ),
        }),
    ],
    performance: {
        hints: 'warning',
    },
})
