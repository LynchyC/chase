const baseConfig = require("./webpack.config.base");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require("webpack-merge");

module.exports = merge(baseConfig, {

    target: 'electron-main',
    entry: {
        main: './src/main.js'
    },

    plugins: [
        new CleanWebpackPlugin('dist/main*')
    ]
});
