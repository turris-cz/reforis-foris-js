/*
 * Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */
const path = require("path");
const pjson = require("./package.json");

module.exports = {
    title: "Foris JS Docs",
    version: `v${pjson.version}`,
    theme: {
        color: {
            link: "#0075a3",
            linkHover: "#00a2e2",
        },
    },
    tocMode: "collapse",
    pagePerSection: true,
    sections: [
        {
            name: "Introduction",
            content: "docs/introduction.md",
        },
        {
            name: "Development",
            content: "docs/development.md",
        },
        {
            name: "Components",
            description: "Set of main components.",
            sections: [
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
                    components: ["src/alertContext/AlertContext.js"],
                    exampleMode: "expand",
                    usageMode: "expand",
                },
            ],
            sectionDepth: 1,
        },

        {
            name: "Bootstrap components",
            description: "Set of bootstrap components.",
            components: "src/bootstrap/*.js",
            exampleMode: "expand",
            usageMode: "expand",
            ignore: ["src/bootstrap/constants.js"],
            sectionDepth: 0,
        },
    ],
    template: {
        favicon: "/docs/components/logo.svg",
    },
    require: [
        "babel-polyfill",
        path.join(__dirname, "src/testUtils/mockGlobals"),
        path.join(
            __dirname,
            "node_modules/bootstrap/dist/css/bootstrap.min.css"
        ),
        path.join(
            __dirname,
            "node_modules/@fortawesome/fontawesome-free/css/all.min.css"
        ),
    ],
    styleguideComponents: {
        LogoRenderer: path.join(__dirname, "docs/components/Logo"),
    },
    webpackConfig: {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
                    loader: "file-loader",
                },
            ],
        },
        devServer: {
            publicPath: "/",
        },
    },
};
