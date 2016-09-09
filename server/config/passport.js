var User = require('../database/models/user');
var jwt = require('passport-jwt');
// var localStrategy = require('passport-local');

if (process.env.NODE_ENV !== 'production') {
  var config = require('../../config.js');
}

var secret = process.env.secret || config.secret;

// Create Local Strategy

// const localOptions = {
//   usernameField: 'email'
// };

// const localLogin = new localStrategy(localOptions, function(email, password, done) {

//   User.findOne({
//     where: {
//       email: email
//     }
//   })
//   .then(function (user) {
//     if (user) {
//       user.comparePassword(password, function(err, isMatch) {
//         if (err) {
//           throw err;
//         }
//         return done(null, user);
//       });
//     } else {
//       done(null, false);
//     }
//   });
// });


// create jwt strategy

const jwtOptions = {
  jwtFromRequest: jwt.ExtractJwt.fromHeader('Authorization'),
  secretOrKey: secret
};

const jwtLogin = new jwt.Strategy(jwtOptions, function(payload, done) {

  User.findOne({
    where: {
      email: payload.sub
    }
  })
  .then(function(user) {
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
  .catch(function (err) {
    throw err;
  });
});

module.exports = function (passport) {

  passport.use(jwtLogin);
  // passport.use(localLogin);

};