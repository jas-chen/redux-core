'use strict';

var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var config = require('./webpack.config.client');

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
  watchOptions: {
    aggregateTimeout: 1500,
    poll: 1000
  },
  stats: { colors: true }
});

server.listen(8080, "localhost", function() {});