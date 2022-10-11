(function () {
  "use strict";
  var MiniCssExtractPlugin = require("mini-css-extract-plugin");
  var webpack = require("webpack");

  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  var webpack = require("webpack");
  var HtmlWebpackPlugin = require("html-webpack-plugin");
  var ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

  module.exports = {
    entry: {
      app: "./src/index.tsx"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(s*)css$/,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
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
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        chunks: ["app", "styles", "environment"],
        filename: "index.html",
        template: "./public/index.html",
        inject: "head",
      }),
      // new webpack.ProvidePlugin({     // fix "process is not defined" error:
      //   process: 'process/browser',
      // }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: "defer",
      })
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
