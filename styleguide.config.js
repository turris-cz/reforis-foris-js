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
            name: "Foris forms",
            content: "docs/forms.md",
            components: [
                "src/form/components/ForisForm.js",
                "src/form/components/alerts.js",
                "src/form/components/SubmitButton.js",
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
    template: {
        head: {
            links: [
                {
                    rel: "stylesheet",
                    href: "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
                },
                {
                    rel: "stylesheet",
                    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css",
                },
            ],
        },
    },
    require: [
        path.join(__dirname, "css/custom.css"),
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
