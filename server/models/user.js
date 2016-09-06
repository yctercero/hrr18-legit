var Sequelize = require('sequelize');
var db = require('../config/database_config.js');

var User = db.define('User', {
  first: Sequelize.STRING,
  last: Sequelize.STRING
});

module.exports = User;