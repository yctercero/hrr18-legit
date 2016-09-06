var Bookshelf = require('bookshelf');
var path = require('path');
var pg = require('pg');

pg.defaults.ssl = true;

var client = new pg.Client();

var db = Bookshelf.initialize({
  client: '',
  connection: {
    host: ,
    port: ,
    user: ,
    password: ,
    database: ,
    charset: 'UTF8_GENERAL_CI'
  }
});

module.exports = db;