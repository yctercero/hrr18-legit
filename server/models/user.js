var Sequelize = require('sequelize');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var db = require('../config/database_config.js');

var User = db.define('User', {
  email: Sequelize.STRING,
  password: Sequelize.STRING
}, instanceMethods: {
  comparePassword: function (attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.password, function (err, isMatch) {
      callback(isMatch);
    });
  }
});

User.beforeCreate(function (user) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(user.password, null, null)
    .then(function (hash) {
      user.password = hash;
    });
});

module.exports = User;