const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.config.common')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: 'development',

  watch: true,

  output: {
    filename: '[name].bundle.js',
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ],

  devServer: {
    hot: true,
    port: '8080',
    disableHostCheck: true,
    contentBase: path.resolve(__dirname, 'dist'),
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: true
  },

  devtool: 'cheap-module-eval-source-map',
})
