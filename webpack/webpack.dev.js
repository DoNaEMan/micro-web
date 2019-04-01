const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
  entry: {
    index: ['webpack-hot-middleware/client?reload=true', path.resolve(__dirname, '../client/index.js')],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]',
            },
          }
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
          plugins: ['syntax-dynamic-import', 'transform-decorators-legacy'],
        },
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../template/index.html'),
      filename: path.resolve(__dirname, '../client/index.html'),
      alwaysWriteToDisk: true,
      title: 'demo',
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/](react|redux|antd)/,
          minChunks: 1,
          priority: 10,
          reuseExistingChunk: true,
        },
        bundle: {
          test: /[\\/]pages[\\/].*\.js[\\/]/,
          minChunks: 2,
          reuseExistingChunk: true,
        },
      },
    },
  },
  mode: 'development',
};
