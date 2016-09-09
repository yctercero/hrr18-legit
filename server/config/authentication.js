var jwt = require('jwt-simple');
var User = require('../database/models/user.js');

if (process.env.NODE_ENV !== 'production') {
  var config = require('../../config.js');
}

module.exports = {

  authenticate: function (req, res) {

  },

  signin: function (req, res) {
    res.send({token: tokenForUser(req.user) });

    // var email = req.body.email;
    // var password = req.body.password;

    // User.findOne({
    //   where: {
    //     email: email
    //   }
    // }).then(function (found) {
    //   if (found) {
    //     found.comparePassword(password, function (match) {
    //       if (match) {
    //         // signin user
    //         // redirect to home
    //       } else {
    //         // wrong password!
    //         // display error message
    //       }
    //     });
    //   } else {
    //     res.redirect('/signup');
    //   }
    // });
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