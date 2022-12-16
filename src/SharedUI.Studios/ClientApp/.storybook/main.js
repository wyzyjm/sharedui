const path = require("path");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@react-theming/storybook-addon",
    "@storybook/addon-a11y"
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5"
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        return true
      },
    },
  },
  webpackFinal: async (config) => {
    config.plugins.push(new MiniCssExtractPlugin());
    config.plugins.push(new CaseSensitivePathsPlugin());
    
    // add SCSS support for CSS Modules
    config.module.rules.push(
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
    });

    // split into more chunks
    config.optimization = {
      splitChunks: {
          chunks: "all",
          minSize: 30 * 1024, // 30KB
          maxSize: 1024 * 1024, // 1MB
      }
    };

    return config;
  }
}