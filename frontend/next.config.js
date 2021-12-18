/** @type {import('next').NextConfig} */

const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.plugins.push(new ESLintPlugin({
      extensions: ['ts', 'tsx'],
      failOnWarning:true
    }));

    return config;
  },
};
