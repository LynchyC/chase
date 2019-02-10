const baseConfig = require("./webpack.config.base");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");

module.exports = merge(baseConfig, {
    target: 'electron-renderer',
    entry: {
        app: './src/index.jsx'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader',
                options: {
                    includePaths: [path.resolve(__dirname, "node_modules", "react-tabs", "style")]
                }
            }]
        }, {
            test: /\.html$/,
            use: 'raw-loader'
        }]
    },
    plugins: [
        new CleanWebpackPlugin('dist/app.js'),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        historyApiFallback: true,
        hot: true
    }
});
