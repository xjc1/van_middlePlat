const path = require('path');
const proxy = require('../config/proxy');

module.exports = {
  stories: ['../stories/**/*.stories.(js|mdx)'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-docs'],
  webpackFinal: async config => {
    config.resolve.alias['@'] = path.resolve('src');
    config.resolve.alias['@@'] = path.resolve('src/.mui');

    config.module.rules.push({
      test: /\.less$/,
      exclude: [/node_modules/],
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            modules: {
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
        },
        'less-loader',
        'postcss-loader',
      ],
    });

    return config;
  },
};
