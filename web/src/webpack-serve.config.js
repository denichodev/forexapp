require('@babel/register');

const appRootDir = require('app-root-dir');
const path = require('path');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackBaseConfig = require('./webpack.config.babel').default;

const host = '0.0.0.0';
const port = process.env.PORT;

webpackBaseConfig.plugins = [
  ...webpackBaseConfig.plugins,
  new HtmlWebpackPlugin({
    template: path.resolve(appRootDir.get(), './web/public/shell.html'),
    chunksSortMode: 'none',
  }),
];

webpackBaseConfig.serve = {
  devMiddleware: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    publicPath: webpackBaseConfig.output.publicPath,
    logLevel: 'silent',
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 1000,
    },
  },
  host,
  port,
  hotClient: {
    host,
    port: Number(port) + 1,
  },
  // All requests not to / will redirect to index.html
  add: (app, _middleware, _options) => {
    app.use(convert(history()));
  },
}

module.exports = webpackBaseConfig;
