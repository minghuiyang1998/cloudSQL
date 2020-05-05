const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const pathConfig = require('./pathConfig');
const path = require('path');

const config = merge(commonConfig, {
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, 'client/index')
  ],
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    contentBase: pathConfig.output,
    historyApiFallback: true,
    host: 'localhost',
    overlay: true,
    open: true,
    progress: true,
    compress: true,
    stats: 'normal',
    inline: true,
    lazy: false,
    hot: true,
    port: 9000,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }  
  }
});

module.exports = config;
