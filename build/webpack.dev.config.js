const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.base.config.js');
const appConfig = require('./app.config.js');

const px2remLoader =  {
  loader: "px2rem-loader",
  options: {
    remUnit: 37.5 // 设计图的1/10
  }
}

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: {
      index: appConfig.absolutePrefix + 'index.html'
    },
    open: true,
    openPage: appConfig.relativePrefix,
    port: 9000,
    hot: true,
    overlay: {
      errors: true
    }
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        },
        'postcss-loader',
        px2remLoader,
        'less-loader'
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        px2remLoader
      ]
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].[hash:8].js',
    publicPath: appConfig.absolutePrefix
  },
}

module.exports = merge(commonConfig, devConfig);
