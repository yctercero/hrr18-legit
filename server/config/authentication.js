var jwt = require('jwt-simple');
var User = require('../database/models/user.js');

if (process.env.NODE_ENV !== 'production') {
  var config = require('../../config.js');
}

module.exports = {

  signin: function (req, res, next) {
    console.log('signin for ' + req.body.email);
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(function (user) {
      if (user) {
        return user.comparePassword(req.body.password)
        .then(function (match) {
          if (match) {
            res.json({
              token: jwt.encode(user, config.secret)
            });
          } else {
            next(new Error('could not match password'));
          }
        });
      } else {
        next(new Error('no matching record found for ' + req.body.emal));
      }
    })
    .catch(function (err) {
      next(err);
    });
  },

  signup: function (req, res, next) {
    console.log('signup for ' + req.body.email);
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(function (user) {
      if (user) {
        console.log('user already exists');
        res.redirect('/signin');
      } else {
        User.create(req.body)
        .then(function (newUser) {
          res.json({
            token: jwt.encode(newUser, config.secret)
          });
        })
        .catch(function (err) {
          next(err);
        });
      }
    })
    .catch(function (err) {
      next(err);
    });
  }

};