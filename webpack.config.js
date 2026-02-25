const path = require("node:path");

module.exports = {
    entry: "./game/index.ts",
    mode: "production",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        library: 'GameExport',
        libraryTarget: 'var',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.png/,
                type: 'asset/bytes',
            },
        ],
    },
    resolve: {
        alias: {
            "game": path.resolve(__dirname, "game"),
            "app": path.resolve(__dirname, "app/src"),
            "lib": path.resolve(__dirname, "lib"),
            "assets": path.resolve(__dirname, "assets")
        },
        extensions: ['.ts', '.js', '.json', '.png']
    }
};