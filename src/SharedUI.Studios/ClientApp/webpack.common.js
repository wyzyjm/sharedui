const path = require('path');

(function () {
  "use strict";
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  var MiniCssExtractPlugin = require("mini-css-extract-plugin");
  var webpack = require("webpack");

  module.exports = {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
      path: path.resolve(__dirname, 'dist', 'package'),
      filename: 'index.js',
      library: 'CognitiveServices',
      libraryTarget: 'umd'
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: [/node_modules/, /\.stories\.tsx$/, /\.spec\.ts$/],
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(s*)css$/,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        // {
        //   test: /\.tsx?$/,
        //   use: 'awesome-typescript-loader',
        //   exclude: '/node_modules/'
        // },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: '/node_modules/'
        },
        // {
        //   test: /\.svg$/,
        //   exclude: '/node_modules/',
        //   use: ['@svgr/webpack'],
        // },
        // {
        //   test: /\.(bpe|txt)$/,
        //   exclude: '/node_modules/',
        //   use: ["raw-loader"],
        // }
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin()
    ],
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".ttf"],
      fallback: {
        util: require.resolve("util/"),
      }
    },
    //   optimization: {
    //     chunkIds: "named",
    //     minimizer: [new TerserPlugin()],
    //     runtimeChunk: "single",
    //     splitChunks: {
    //       maxSize: 244000,
    //       minSize: 244000,
    //       hidePathInfo: true,
    //       cacheGroups: {
    //         "vendors-async": {
    //           test: /[\\/]node_modules[\\/]/,
    //           name: "vendors-async",
    //           chunks: "async",
    //           minChunks: 2,
    //           reuseExistingChunk: true,
    //         },
    //         "vendors": {
    //           test: /[\\/]node_modules[\\/]/,
    //           name: "vendors",
    //           chunks: "initial",
    //           priority: -10,
    //           reuseExistingChunk: true,
    //         },
    //       },
    //     },
    //   },
  };
})();
