module.exports = {
    env: {
        development: {
            plugins: [["styled-components", {
                minify: false
            }]]
        },
        production: {
            plugins: [["styled-components", {
                displayName: false
            }]]
        }
    },
    plugins: [
        "@babel/proposal-class-properties"
    ],
    presets: [
        "@babel/env",
        "@babel/react"
    ]
};
