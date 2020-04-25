const path = require("path");

module.exports = {
    module: {
        rules: [{
            exclude: /node_modules/,
            loader: "babel-loader",
            test: /\.jsx?$/
        }, {
            exclude: /node_modules/,
            loader: "ts-loader",
            test: /\.tsx?$/
        }]
    },
    node: {
        __dirname: false
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".ts", ".tsx"],
        modules: [
            "node_modules"
        ]
    }
};
