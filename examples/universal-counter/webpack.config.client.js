'use strict';

var webpack = require('webpack');
var path = require('path');

var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new webpack.optimize.OccurenceOrderPlugin()
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true
      }
    })
  );
}

var client = {
  entry: {
    client: './src/client/'
  },
  output: {
    path: path.join(__dirname, 'build', 'assets', 'js'),
    filename: 'bundle.js'
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
      }
    ]
  },
  plugins: plugins
};

module.exports = client;