var path = require("path");
const { merge } = require("webpack-merge");
var common = require("./webpack.common.js");
var webpack = require("webpack");

const webpackDevServerPort = 44321;
const proxyTarget = "https://localhost:44360";

module.exports = merge(common, {
    mode: "development",
    devtool: "source-map",
    output: {
        filename: "[name].bundle.[hash].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
    },
    devServer: {
        server: 'https',
        static: {
            publicPath: "/",
            watch: true
        },
        // proxy: {
        //     '*': {
        //         target: proxyTarget
        //     }
        // },
        port: webpackDevServerPort,
        hot: true,
        open: true,
        historyApiFallback: true,
    }
});
