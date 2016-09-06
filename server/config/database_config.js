var Sequelize = require('sequelize');
var config = require('../../config.js');

var connection = config.connection || process.env.DATABASE_URL;

var sequelize = new Sequelize(connection,
  {
    dialectOptions: {
      ssl: true
    }
  }
);

module.exports = sequelize;