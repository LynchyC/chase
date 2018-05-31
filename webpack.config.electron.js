const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {

    target: 'electron-main',
    entry: './src/main.ts',

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Chase',
            template: './src/index.html',
            inject: false
        })
    ]
});