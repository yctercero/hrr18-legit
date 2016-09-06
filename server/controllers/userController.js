var User = require('../models/user.js');

module.exports = {

  getAll: function (req, res) {
    User.findAll().then(function (data) {
      res.send(data);
    });
  }

};