/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

const path = require("path");

module.exports = {
    title: "Foris JS docs",
    sections: [
        {
            name: "Foris JS",
            content: "docs/intro.md",
        },
        {
            name: "Development (Linking)",
            content: "docs/development.md",
        },
        {
            name: "Foris forms",
            components: [
                "src/form/components/ForisForm.js",
                "src/form/components/alerts.js",
                "src/form/components/SubmitButton.js",
            ],
            exampleMode: "expand",
            usageMode: "expand",
        },
        {
            name: "Alert Context",
            components: [
                "src/alertContext/AlertContext.js",
            ],
            exampleMode: "expand",
            usageMode: "expand",
        },
        {
            name: "Bootstrap components",
            description: "Set of bootstrap components.",
            components: "src/bootstrap/*.js",
            exampleMode: "expand",
            usageMode: "expand",
            ignore: [
                "src/bootstrap/constants.js",
            ],
        },
    ],
    require: [
        "babel-polyfill",
        path.join(__dirname, "src/testUtils/mockGlobals"),
        path.join(__dirname, "node_modules/bootstrap/dist/css/bootstrap.min.css"),
        path.join(__dirname, "node_modules/@fortawesome/fontawesome-free/css/all.min.css"),
    ],
    webpackConfig: {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                }, {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                }, {
                    test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
                    loader: "file-loader",
                },
            ],
        },
    },
};
