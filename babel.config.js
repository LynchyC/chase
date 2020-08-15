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
    presets: [
        ["@babel/env", {
            shippedProposals: true,
            targets: "chrome 79"
        }],
        "@babel/react"
    ]
};
