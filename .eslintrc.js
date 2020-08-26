module.exports = {
    extends: ["eslint-config-reforis", "prettier"],
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": ["error"],
        "import/prefer-default-export": "off",
    },
};
