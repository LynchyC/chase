module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                debug: true,
                corejs: "3",
                useBuiltIns: "usage"
            }
        ],
        "@babel/preset-react"
    ],
    plugins: [
        [
            "@babel/plugin-proposal-class-properties",
            {
                loose: true
            }
        ],
        "babel-plugin-styled-components"
    ]
};