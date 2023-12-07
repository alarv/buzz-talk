const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './src/script/script.ts',
  target: 'node',

  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.script.json',
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
  ],
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
