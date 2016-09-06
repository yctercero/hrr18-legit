var Sequelize = require('sequelize');
var db = require('../config/database_config.js');

var Assignment = db.define('Assignment', {
  name: Sequelize.STRING,
  maxScore: Sequelize.INTEGER
});

module.exports = Assignment;