'use strict';

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true
      }
    })
  );

  plugins.push(new webpack.optimize.OccurenceOrderPlugin());
}

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
    path: path.join(__dirname, '..', 'build', 'server'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'rx': 'rx-lite'
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
  plugins: plugins,
  externals: nodeModules
};

module.exports = server;