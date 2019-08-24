const baseConfig = require("./webpack.config.base");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require("webpack-merge");

module.exports = (env, argv) => {
    const isDev = argv.mode !== "production";
    return merge(baseConfig, {
        target: 'electron-main',
        entry: {
            main: './src/main/main.js'
        },
        devtool: isDev ? "source-map" : "",
        plugins: [
            new CleanWebpackPlugin('dist/main*')
        ]
    });
};
