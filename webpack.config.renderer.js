const baseConfig = require("./webpack.config.base");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");

module.exports = (env, argv) => {
    const isDev = argv.mode !== "production";
    return merge(baseConfig, {
        target: 'electron-renderer',
        entry: {
            app: './src/index.jsx'
        },
        devtool: isDev ? "source-map" : "",
        module: {
            rules: [{
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }]
            }, {
                test: /\.(jpg|png|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }
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
};
