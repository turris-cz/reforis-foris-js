module.exports = {
    presets: [
        ["@babel/preset-env", {
            targets: {
                esmodules: true,
            },
        }],
        "@babel/preset-react",
    ],
    plugins: [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-syntax-export-namespace-from",
        "@babel/plugin-syntax-export-default-from",
    ],
};
