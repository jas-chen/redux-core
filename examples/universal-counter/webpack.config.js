'use strict';

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

var server = {
  entry: {
    server: './src/server/'
  },
  target: 'node',
  output: {
    path: path.join(__dirname, 'build', 'server'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'rx': 'rx-lite-joinpatterns',
      'redux-core': path.join(__dirname, '..', '..', 'src')
    },
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test:  /\.json$/, loader: 'json-loader'
      }
    ]
  },
  externals: nodeModules
};

var client = {
  devtool: 'eval',
  entry: {
    client: './src/client/'
  },
  output: {
    path: path.join(__dirname, 'build', 'assets', 'js'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      'rx': 'rx-lite-joinpatterns',
      'redux-core': path.join(__dirname, '..', '..', 'src')
    },
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = [server, client];