const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.config.common')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require('path');

let options = {
  mode: 'production',

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].bundle.js',
  },

  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new OptimizeCSSAssetsPlugin({})
  ],

  devtool: 'source-map',
}

//npm 包分析工具
if (process.env.npm_config_report) {
  options.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(common, options)
