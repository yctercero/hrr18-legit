var Sequelize = require('sequelize');

if (process.env.NODE_ENV !== 'production') {

  // local env variables are ignored by Git, so check if NODE_ENV is
  // production - otherwise this throws a file-not-found error:

  var config = require('../../config.js');
}

var connection = process.env.DATABASE_URL || config.connection;

var sequelize = new Sequelize(connection,
  {
    dialectOptions: {
      ssl: true
    }
  }
);

module.exports = sequelize;