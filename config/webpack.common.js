const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dotEnv = require('dotenv');

dotEnv.config();

const PORT = process.env.PORT || 8080;

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../public/index.html'),
  filename: 'index.html',
  inject: 'body',
  favicon: './public/favicon.png'
});

const CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'common',
  filename: 'js/common.[hash].js',
  minChunks: 2,
  chunks: [
    'berkshireswash',
    'bundle'
  ]
});

const DefinePlugin = new webpack.DefinePlugin({
  "process.env": {
    PORT: JSON.stringify(PORT),
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }
});

const ManifestPluginConfig = new ManifestPlugin({
  fileName: 'asset-manifest.json',
  extensions: ['.js', '.css', '.woff2', '.png']
});

const SWPrecacheWebpackPluginConfig = new SWPrecacheWebpackPlugin({
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  filename: 'service-worker.js',
  logger: (message) => {
    if (message.indexOf('Total precache size is') === 0) {
      return;
    }
    console.log(message);
  },
  minify: true,
  navigateFallback: '/index.html',
  staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
  cacheId: 'tester',
  runtimeCaching: [
    {
      urlPattern: '/',
      handler: 'cacheFirst',
    }
  ]
});

const CopyWebpackPluginConfig = new CopyWebpackPlugin([
  {
    from: path.join(__dirname, '../public/manifest.json'),
    to: path.join(__dirname, '../build/manifest.json')
  }
]);

module.exports = {
  entry: {
    berkshireswash: path
      .resolve(__dirname, '../src/assets/fonts/berkshireswash/index.js'),
    bundle: path.resolve(__dirname, '../src/index.js')
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, '../src/assets'),
      components: path.resolve(__dirname, '../src/components')
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    CommonsChunkPlugin,
    HtmlWebpackPluginConfig,
    DefinePlugin,
    ManifestPluginConfig,
    SWPrecacheWebpackPluginConfig,
    CopyWebpackPluginConfig
  ],
  stats: {
    colors: true
  },
  node: {
    fs: 'empty'
  }
};
