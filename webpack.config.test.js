const baseConfig = require("./webpack.config.base");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require("webpack-merge");

module.exports = merge(baseConfig, {

    target: 'electron-main',
    entry: {
        app: './src/index.tsx',
        main: './src/main.ts'
    },

    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }]
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