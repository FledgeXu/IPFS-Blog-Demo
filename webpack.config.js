const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require('webpack')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = {
    resolve:{
        alias : {
            path: require.resolve("path-browserify")
        }
    },
    mode:'development',
    entry: "./src/index.jsx",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",

                },
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name].js",
        publicPath: "./",
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ title: "DIIF Desktop" }),
        // fixes Module not found: Error: Can't resolve 'stream' in '.../node_modules/nofilter/lib'
        new NodePolyfillPlugin(),
        // Note: stream-browserify has assumption about `Buffer` global in its
        // dependencies causing runtime errors. This is a workaround to provide
        // global `Buffer` until https://github.com/isaacs/core-util-is/issues/29
        // is fixed.
        new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser'
    })
    ],
    devServer: {
        contentBase: path.join(__dirname, "../dist/renderer"),
        historyApiFallback: true,
        compress: true,
        hot: true,
        port: 4000,
        publicPath: "/",
    }
}
