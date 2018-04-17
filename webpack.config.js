const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {

  watch: true,

  target: 'web',

  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:8080',
    './src/client.jsx'
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[hash].bundle.js',
    // filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {modules: true, localIdentName: '[hash:base64:5]__[local]'}
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: '旅游事业',
      filename: 'index.html',
      template: 'index.html'
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true
    })
  ],

  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },

  optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },

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
  devtool: 'source-map',
}
