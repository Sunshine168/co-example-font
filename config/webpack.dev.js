const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const config = require('config')

const baseConfig = require('./webpack.base')
const HotMiddleWareConfig = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const PORT = process.env.PORT ? process.env.PORT : config.get('HMR_PORT')

module.exports = merge(baseConfig, {
  entry: [
    HotMiddleWareConfig,
     'react-hot-loader/patch', path.resolve(__dirname, '../main.js')
  ],
  devtool: '#cheap-module-source-map',
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, '../build'),
    publicPath: '/',
    historyApiFallback: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
    }),
    new OpenBrowserPlugin({ url: `http://localhost:${PORT}` })
  ],
})
