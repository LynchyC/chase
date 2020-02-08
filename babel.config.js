module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    electron: "8.0.0"
                }
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