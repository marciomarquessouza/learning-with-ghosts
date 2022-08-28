const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    module: {
        rules: [
            {
                test: /\.m?js/,
                type: 'javascript/auto',
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.glsl$/,
                use: ['raw-loader', 'glslify-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /strings\.json$/,
                type: 'json',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    entry: {
        'ghost-town': './src/client/ghost-town-map/ghost-town.ts',
        lighthouse: './src/client/lighthouse-challenge/lighthouse.ts',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../../dist/client'),
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/client/assets' },
                { from: 'src/client/ghost-town-map/ghost-town.html' },
                { from: 'src/client/lighthouse-challenge/lighthouse.html' },
            ],
        }),
    ],
}
