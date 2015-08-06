'use strict';

var client = require('./webpack.config.client.js');
var server = require('./webpack.config.server.js');

module.exports = [client, server];