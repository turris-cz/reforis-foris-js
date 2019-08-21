/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */


const path = require('path');

module.exports = () => ({
    mode: 'development',
    entry: './src/index.js',
    resolve: {
        modules: [
            path.resolve(__dirname, './src'),
            path.resolve(__dirname, './node_modules')
        ],
        extensions: [".js", ".json"],
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    output: {
        filename: 'foris.js',
        path: path.join(__dirname, 'dist/'),
        libraryTarget: 'umd',
    }
});

