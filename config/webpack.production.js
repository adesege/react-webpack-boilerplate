const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlCriticalPlugin = require("html-critical-webpack-plugin");
const common = require('./webpack.common');

const extractSass = new ExtractTextPlugin({
  filename: 'css/[name].[contenthash].css',
  allChunks: true
});

const HtmlCriticalPluginConfig = new HtmlCriticalPlugin({
  base: path.join(path.resolve(__dirname), '../build/'),
  src: 'index.html',
  dest: 'index.html',
  inline: true,
  minify: true,
  extract: true,
  width: 375,
  height: 565,
  penthouse: {
    blockJSRequests: false,
  }
});

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'js/[name].js',
    publicPath: `/`
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }, {
              loader: 'sass-loader',
              options: {
                minimize: true
              }
            }]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }
        })
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    extractSass,
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.optimize.UglifyJsPlugin(),
    HtmlCriticalPluginConfig
  ],
});
