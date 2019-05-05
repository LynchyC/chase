const baseConfig = require("./webpack.config.base");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require("webpack-merge");

module.exports = merge(baseConfig, {

    target: 'electron-main',
    entry: {
        app: './src/index.jsx',
        main: './src/main.js'
    },

    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }]
        }, {
            test: /\.(jpg|png|gif|svg|ttf|eot|woff|woff2)$/,
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
        new CleanWebpackPlugin('dist/*'),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ]
});
