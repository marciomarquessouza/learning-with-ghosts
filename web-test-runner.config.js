const { legacyPlugin } = require('@web/dev-server-legacy')
const { esbuildPlugin } = require('@web/dev-server-esbuild')

module.exports = {
    files: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
    plugins: [
        esbuildPlugin({ ts: true }),
        legacyPlugin({
            polyfills: {
                webcomponents: true,
                custom: [
                    {
                        name: 'lit-polyfill-support',
                        path: 'node_modules/lit/polyfill-support.js',
                        test: "!('attachShadow' in Element.prototype)",
                        module: false,
                    },
                ],
            },
        }),
    ],
}
