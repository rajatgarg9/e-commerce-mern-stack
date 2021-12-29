/** @type {import('next').NextConfig} */

const ESLintPlugin = require("eslint-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.plugins.push(
      new ESLintPlugin({
        extensions: ["ts", "tsx"],
      }),
      new StylelintPlugin({ failOnWarning: true }),
    );

    return config;
  },
};
