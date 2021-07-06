const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env = {}, argv) => {
    const isDev = argv.mode === 'development';
    const isTest = argv.mode === 'test';
    const isProd = argv.mode === 'production' || argv.mode === undefined; // prod is default

    return {
        entry: {
            index: './src/index.tsx'
        },
        output: {
            // where to put any output file - the dist folder for the webserver and nginx.
            path: path.resolve(__dirname, 'dist'),
            // also used for bundles created via dynamic imports.
            filename: '[name].[contenthash].js',
            // publicPath: '/'
        },
        resolve: {
            // so file extensions can be left out in imports
            // No (babel) loader is registered for js files, but Babel-loader places imports of core-js Js files 
            extensions: ['.js', '.ts', '.tsx']
        },
        // see https://webpack.js.org/configuration/devtool/#production for further optimisation
        devtool: isProd ? 'source-map' : 'eval-cheap-source-map',
        devServer: {
            // which folder to serve from on localhost:8080.
            // dist files are only put into memory and not reflected on the file system.

            // TODO If your page expects to find the bundle files on a different path,
            // you can change this with the publicPath option in the dev server's configuration.
            contentBase: './dist',

            // open the default browser after initial build.
            open: true,

            // see https://webpack.js.org/guides/hot-module-replacement & https://github.com/gaearon/react-hot-loader
            hot: false,
        },
        module: {
            rules: [
                // HTML is not referenced in JS files but as template by `HtmlWebpackPlugin`.
                { test: /\.html$/, use: ['html-loader'] },

                // style-loader takes care of HMR too
                { test: /\.css$/, use: ['style-loader', 'css-loader'] },

                // excluding node_modules improves speed but means libraries do not become neither transpiled nor polyfilled.
                // the Babel docs have an example for how to include specific libraries when needed.
                { test: /\.tsx?$/, use: ['babel-loader', 'ts-loader'], exclude: /node_modules/ },

                { test: /\.(gif|jpg)$/, type: 'asset/resource' }
            ]
        },
        plugins: [
            // reset output.path on build while !cleanStaleWebpackAssets avoids the deletion of index.html on incremental builds.
            new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),

            // generate index.html that references output files dynamically.
            // A custom HTML template is needed for React's root div to be placed.
            new HtmlWebpackPlugin({
                template: './src/index.html',
                favicon: './src/assets/favicon.ico'
            }),

            // visual representation of bundles and chunks.
            ...(env.analyse ? [new BundleAnalyzerPlugin()] : [])
        ],

        optimization: {
            minimize: false,
            // the entry bundle contains the runtime and manifest, that can differ between deployments. This can cause unnecessary
            // changes in content-hashing and hence cache busting. This boilterplate can be extracted into a separate bundle.
            // runtimeChunk: 'single',

            // splitChunks: { ... }
        }
    }
};


// {
//     "presets": [
//         "@babel/preset-env",
//         "@babel/preset-react"
//     ],
//         "targets": {
//         "chrome": "58",
//             "ie": "11"
//     }
// }
