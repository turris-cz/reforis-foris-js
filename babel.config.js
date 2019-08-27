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
        "@babel/plugin-syntax-export-default-from",
        "@babel/plugin-transform-runtime",
    ],
};
