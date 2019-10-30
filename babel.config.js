module.exports = {
    presets: [
        "@babel/preset-env",
        "@babel/preset-react",
    ],
    plugins: [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-syntax-export-default-from",
        ["module-resolver", {
            root: ["./src"],
            alias: {
                test: "./test",
                underscore: "lodash",
            },
        }],
    ],
    env: {
        development: {
            ignore: ["**/__tests__", "./scripts"],
        },
        test: {
            ignore: ["./scripts"],
        },
    },
};
