// var MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");
var path = require("path");
//var merge = require("webpack-merge");
var common = require("./webpack.common.js");
var webpack = require("webpack");

module.exports = merge(common, {
  // mode: "production",
  // output: {
  //   filename: "[name].bundle.[contenthash].js",
  //   path: path.resolve(__dirname, "dist"),
  //   library: '',
  //   libraryTarget: 'commonjs'
  // },
  // plugins: [
  // ]
  //   plugins: [
  //     new MiniCssExtractPlugin({
  //       filename: "[name].bundle.[contenthash].css",
  //     }),
  //   ],
});
