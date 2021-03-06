const baseConfig = require("./webpack.config.base");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");

module.exports = merge(baseConfig, {

    target: "electron-main",
    entry: {
        app: "./src/renderer/index.js",
        main: "./src/main/main.js"
    },

    module: {
        rules: [{
            test: /\.(jpg|png|gif|svg|ttf|eot|woff|woff2)$/,
            use: {
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]"
                }
            }
        }, {
            test: /\.html$/,
            use: "raw-loader"
        }]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/renderer/index.html",
            filename: "index.html"
        })
    ]
});
