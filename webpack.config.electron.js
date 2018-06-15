const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(baseConfig, {

    target: 'electron-main',
    entry: {
        main: './src/main.ts'
    },

    plugins: [
        new CleanWebpackPlugin('dist/main*')
    ]
});