const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development';
    const isTest = argv.mode === 'test';
    const isProd = argv.mode === 'production' || argv.mode === undefined; // prod is default

    const config = {
        entry: {
            index: './src/index.jsx'
        },
        output: {
            // where to put any output file - the dist folder for the webserver and nginx.
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].bundle.js',
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        // see https://webpack.js.org/configuration/devtool/#production for further optimisation
        devtool: isProd ? 'source-map' : 'eval-cheap-source-map',
        devServer: {
            // which folder to serve from on localhost:8080.
            // rebuilds, done by the server, are only put into memory and not reflected on the file system.
            
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
                { test: /\.(js|jsx)$/, use: ['babel-loader'], exclude: /node_modules/ },
                { test: /\.(gif|jpg)$/, type: 'asset/resource' }
            ]
        },
        plugins: [
          // reset output.path on build while !cleanStaleWebpackAssets avoids the deletion of index.html on incremental builds.
          new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }), 
          
          // generate index.html that references output files dynamically.
          // A custom HTML template is needed for React's root div to be placed.
          new HtmlWebpackPlugin({
            template: './src/index.html'
          })
        ]
    }

    if (env.analyse) {
        // visual representation of bundles and chunks.
        config.plugins.push(new BundleAnalyzerPlugin())
    }

    return config;
};