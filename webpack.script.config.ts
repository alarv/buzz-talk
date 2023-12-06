import path from 'path';
import webpack from 'webpack';
import ShebangPlugin from 'webpack-shebang-plugin';

const config: webpack.Configuration = {
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
  plugins: [new ShebangPlugin()],
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

export default config;
