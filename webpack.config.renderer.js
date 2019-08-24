const baseConfig = require("./webpack.config.base");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");

module.exports = (env, argv) => {
    const isDev = argv.mode !== "production";
    return merge(baseConfig, {
        target: "electron-renderer",
        entry: {
            app: "./src/renderer/index.js"
        },
        devtool: isDev ? "source-map" : "",
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
            new CleanWebpackPlugin("dist/app.js"),
            new HtmlWebpackPlugin({
                template: "./src/renderer/index.html",
                filename: "index.html"
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
