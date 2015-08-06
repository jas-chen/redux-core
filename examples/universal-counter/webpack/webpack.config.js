'use strict';

var server = require('./webpack.config.server');
var client = require('./webpack.config.client');

module.exports = [server, client];