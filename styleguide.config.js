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
            name: "Common Components",
            description: "Set of main components.",
            sections: [
                {
                    name: "ForisForm",
                    components: [
                        "src/form/components/ForisForm.js",
                        "src/form/components/alerts.js",
                        "src/form/components/SubmitButton.js",
                    ],
                    exampleMode: "expand",
                    usageMode: "expand",
                },
                {
                    name: "RichTable",
                    components: ["src/common/RichTable/RichTable.js"],
                    exampleMode: "expand",
                    usageMode: "expand",
                },
                {
                    name: "ActionButtonWithModal",
                    components: [
                        "src/common/ActionButtonWithModal/ActionButtonWithModal.js",
                    ],
                    exampleMode: "expand",
                    usageMode: "expand",
                },
            ],
            sectionDepth: 1,
        },
        {
            name: "Bootstrap Components",
            description: "Set of bootstrap components.",
            components: "src/bootstrap/*.js",
            exampleMode: "expand",
            usageMode: "expand",
            ignore: ["src/bootstrap/constants.js", "src/bootstrap/Radio.js"],
            sectionDepth: 0,
        },
        {
            name: "Contexts",
            components: [
                "src/context/alertContext/AlertContext.js",
                "src/context/customizationContext/CustomizationContext.js",
            ],
            exampleMode: "expand",
            usageMode: "expand",
        },
    ],
    template: {
        favicon: "/docs/components/logo.svg",
    },
    require: [
        "babel-polyfill",
        path.join(__dirname, "src/testUtils/mockGlobals.js"),
        path.join(
            __dirname,
            "node_modules/bootstrap/dist/css/bootstrap.min.css"
        ),
        path.join(__dirname, "node_modules/bootstrap/dist/js/bootstrap.min.js"),
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
    },
};
