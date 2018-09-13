const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');

module.exports = {
  target: 'web',

  entry: [
    'babel-polyfill',
    './src/client.jsx'
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },

      {
        test: /\.html$/,
        use: 'html-loader'
      },

      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },

      //start image
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000 /* 图片大小小于1000字节限制时会自动转成 base64 码引用*/
            }
          },

          {
            loader: 'image-webpack-loader',
            options: {
              disable: process.env.NODE_ENV, //develop 模式关闭图片压缩
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              }
              // the webp option will enable WEBP
              //safari 不支持webp
              // webp: {
              //   quality: 75
              // }
            }
          }
        ]
      }
      //end image
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {}
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: '旅游事业',
      filename: 'index.html',
      template: 'index.html',
      environment: process.env.NODE_ENV
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    }),
    new ManifestPlugin(),
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
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
}
