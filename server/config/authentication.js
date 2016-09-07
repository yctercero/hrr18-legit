var User = require('../database/models/user.js');

module.exports = {

  authenticate: function (req, res) {

  },

  signin: function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
      where: {
        email: email
      }
    }).then(function (found) {
      if (found) {
        found.comparePassword(password, function (match) {
          if (match) {
            // signin user
            // redirect to home
          } else {
            // wrong password!
            // display error message
          }
        });
      } else {
        res.redirect('/signup');
      }
    })
  },

  signup: function(req, res, next){
    var email = req.body.email;
    var password = req.body.password;

    User.create({
      where: {
        email: email,
        password: password
      }
    }).then(function (user) {
      // signin user
      // redirect to home
    }).catch(function (err) {
      // does the record already exist?
    });
  }

};