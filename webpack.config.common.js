const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const pathConfig = require('./pathConfig');

module.exports = {
  entry: pathConfig.entry,
  output: {
    path: pathConfig.output,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'babel-loader',
          {
            loader: require('styled-jsx/webpack').loader,
            options: {
              type: 'global',
            },
          }]
      },
      {
        test: /\.scss$/,
        use: [
          'babel-loader',
          {
            loader: require('styled-jsx/webpack').loader,
            options: {
              type: 'global',
            },
          },
          'sass-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './client/index.html',
      filename: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.d.ts'],
    mainFields: ['browser', 'module', 'main'],
    alias: {
      '@': path.join(__dirname, 'client'),
      assets: path.join(__dirname, 'client/assets'),
      components: path.join(__dirname, 'client/components'),
      stylesheets: path.join(__dirname, 'client/stylesheet'),
      constants: path.join(__dirname, 'client/constants'),
      pages: path.join(__dirname, 'client/pages'),
      utils: path.join(__dirname, 'client/utils'),
    }
  },
};