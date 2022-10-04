const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    module: {
        rules: [
            {
                test: /\.(tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
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
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            onlyCompileBundledFiles: true,
                            configFile: 'tsconfig.json',
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.glsl$/,
                use: ['raw-loader', 'glslify-loader'],
            },
            {
                test: [/\.vert$/, /\.frag$/],
                use: 'raw-loader',
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
        'main-page': './src/client/main-page/main-page.tsx',
        'ghost-town': './src/client/ghost-town-map/ghost-town.ts',
        lighthouse: './src/client/lighthouse-challenge/lighthouse.ts',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../../dist/client'),
    },
    plugins: [
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true),
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: 'src/client/assets' }],
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/client/main-page/main-page.html',
            chunks: ['main-page'],
        }),
        new HtmlWebpackPlugin({
            filename: 'terms-conditions.html',
            template: 'src/client/main-page/terms-conditions-page.html',
            chunks: ['main-page'],
        }),
        new HtmlWebpackPlugin({
            filename: 'ghost-town.html',
            template: 'src/client/ghost-town-map/ghost-town.html',
            chunks: ['ghost-town'],
        }),
        new HtmlWebpackPlugin({
            filename: 'lighthouse.html',
            template: 'src/client/lighthouse-challenge/lighthouse.html',
            chunks: ['lighthouse'],
        }),
    ],
}
