const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    typeCheck: true,
                    emitErrors: true
                }
            },
            {
                test: /\.ts?$/,
                use: ['ts-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    node: {
        __dirname: false
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        new HtmlWebpackPlugin({
            title: 'Chase',
            template: './src/index.html',
            inject: false
        })
    ]
};

module.exports = [
    Object.assign({
        target: 'electron-main',
        entry: {
            main: './src/main.ts'
        }
    }, commonConfig)
]