var Sequelize = require('sequelize');
var config = require('../../config.js');

var sequelize = new Sequelize(config.connection,
  {
    dialectOptions: {
      ssl: true
    }
  }
);

module.exports = sequelize;