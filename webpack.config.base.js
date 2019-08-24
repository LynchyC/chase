const path = require("path");

module.exports = {

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: "babel-loader",
            exclude: /node_modules/
        }]
    },

    resolve: {
        extensions: [".jsx", ".js"],
        modules: [
            path.join(__dirname, "src"),
            path.join(__dirname, "src", "main"),
            path.join(__dirname, "src", "renderer"),
            path.join(__dirname, "resources"),
            "node_modules"
        ]
    },

    node: {
        __dirname: false
    }
};
