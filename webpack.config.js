const path = require('path');
const webpack = require('webpack');


var APP_DIR = path.resolve(__dirname, '/client/src');
var BUILD_DIR = path.resolve(__dirname, '/client/dist');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  }
};



module.exports = config;