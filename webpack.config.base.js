const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

    module: {
        rules: [{
                test: /\.tsx$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    typeCheck: true,
                    emitErrors: true
                }
            },
            {
                test: /\.tsx?$/,
                use: ['ts-loader']
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: [
            path.join(__dirname, 'app'),
            'node_modules',
        ]
    },

    node: {
        __dirname: false
    },

    plugins: [
        new CleanWebpackPlugin('dist')
    ]
};