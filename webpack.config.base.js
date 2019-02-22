const path = require("path");

module.exports = {

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }
        ]
    },

    resolve: {
        extensions: ['.jsx', '.js'],
        modules: [
            path.join(__dirname, 'app'),
            'node_modules',
        ]
    },

    node: {
        __dirname: false
    }
};
