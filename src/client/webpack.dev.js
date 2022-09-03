const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = merge(common, {
    mode: 'development',
    plugins: [
        new Dotenv({
            path: './.env.development',
        }),
    ],
    devtool: 'eval-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, '../../dist/client'),
        },
        hot: true,
        port: 9090,
    },
})
