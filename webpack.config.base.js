const path = require("path");

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
                use: [
                    'babel-loader',
                    'ts-loader'
                ]
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
    }
};