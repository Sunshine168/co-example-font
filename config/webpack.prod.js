const path = require('path')
const baseConfig = require('./webpack.base')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = merge(baseConfig, {
  entry: [path.resolve(__dirname, '../main.js')],
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'public/static/js/[name].[chunkhash:8].js',
    chunkFilename: 'public/static/js/[name].[chunkhash:8].chunk.js',
    publicPath: '/',
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new CleanWebpackPlugin(['../build/*.*', '../build/*'], {
      root: path.resolve(__dirname, '../build'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'public/static/js/vendor.[hash].js',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') >= 0
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../template.html'),
      path: path.join(__dirname, '../build'),
      excludeChunks: ['base'],
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
      },
    }),
    new webpack.HashedModuleIdsPlugin(),
    new MinifyPlugin(),
  ],
})
