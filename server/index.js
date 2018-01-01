const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('../config/webpack.dev')
const proxy = require('http-proxy-middleware')

const PORT = process.env.PORT ? process.env.PORT : config.get('HMR_PORT')

const app = express()
const compiler = webpack(webpackConfig)

const BUILD_PATH = path.resolve(__dirname, '../build')

app.engine('.html', require('ejs').__express)

app.set('views', BUILD_PATH)
app.set('view engine', 'html')

// support spa router
app.use('/', require('connect-history-api-fallback')())

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use(express.static(BUILD_PATH))

app.get('/', (req, res) => {
  res.render(BUILD_PATH)
})

if (config.proxy.enable) {
  const targetHost = config.proxy.host
  //you can config it by yourself
  //https://github.com/chimurai/http-proxy-middleware
  const authProxy = proxy({
    target: targetHost,
    changeOrigin: true,
  })
  const match = config.proxy.match ? config.proxy.match : '**'
  app.use('**', authProxy)
}

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}! \n`)
})
