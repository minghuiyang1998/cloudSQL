const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const pathConfig = require('./pathConfig');

const config = merge({
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
  }
}, commonConfig);

module.exports = config;
