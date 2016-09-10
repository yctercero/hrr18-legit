var jwt = require('jwt-simple');
var User = require('../database/models/user.js');

if (process.env.NODE_ENV !== 'production') {

  // config.js is ignored by Git
  var config = require('../../config.js');
}

var tokenForUser = function(user) {
  var secret = process.env.secret || config.secret;
  // each token we take email and add a string
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.email, iat: timestamp}, secret);
  };


module.exports = {

  authenticate: function (req, res) {
  },

  signin: function (req, res) {
    res.send({token: tokenForUser(req.user), userid:req.user.id });
  },

  signup: function(req, res, next) {

    User.findOrCreate({
      where: {
        email: req.body.email
      }
    }).then(function (user) {
      if (user) {
        res.redirect('/signin');
      } else {
        User.create(req.body)
        .then(function (newUser) {
          res.json({token: tokenForUser(user) });
        })
        .catch(function (err) {
          throw err;
        });
      }
    }).catch(function (err) {
      throw err;
    });
  }

};
