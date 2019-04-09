const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
import { ReactLoadablePlugin } from 'react-loadable/webpack';


const config = {
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
        test: /\.(css|less)$/,
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
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.scss$/,
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
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
            },
          },
          'sass-loader',
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
          plugins: ['react-loadable/babel', 'syntax-dynamic-import', 'add-module-exports', 'transform-decorators-legacy', 'loadable-components/babel'],
        },
      },
    ],
  },
  target: "node",
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../template/index.html'),
      filename: path.resolve(__dirname, '../client/index.html'),
      alwaysWriteToDisk: true,
      title: 'demo',
    }),
    new ReactLoadablePlugin({
      filename: './dist/react-loadable.json',
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/](react|redux|antd)/,
          name: 'react-all',
          chunks: 'all',
        },
        ant: {
          test: /[\\/]node_modules[\\/](antd)/,
          name: 'ant',
          chunks: 'all',
        },
      },
    },
  },
  mode: 'development',
};

// 选择性加载分析工具
if (process.env.ANALYZER) {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
