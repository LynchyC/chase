const baseConfig = require("./webpack.config.base");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require("webpack-merge");
const path = require("path");

module.exports = merge(baseConfig, {
    
    entry: {
        app: './src/index.tsx'
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
        new CleanWebpackPlugin('dist/app.js'),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ],

    devServer: {
        contentBase: path.resolve(__dirname, "dist")
    }
});