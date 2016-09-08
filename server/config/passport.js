var passport = require('passport');
var User = require('../database/models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('../../config.js');
var LocalStrategy = require('passport-local');
// Passport : is the User logged in or not?

// Create Local Strategy

const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {

  User.findOne({ where: {email: email} }).then(function(user) {
    if (!user) {
      done(null, false);
    }
  user.comparePassword(password, function(err, isMatch) {
    if (err) {return done(err); }
    if (!isMatch) { return done(null, false); }

    return done(null, user);
  });
  }).catch(function (err) {
    return console.log(err);
  });
});


var secret = process.env.secret || config.secret;
//setup Options for jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret
};

// create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if email in the payload exists in our database
  User.findOne({ where: {email: payload.sub} }).then(function(user) {
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  }).catch(function (err) {
    return console.log(err);
  });

});
  // User.findOne(payload.sub, function(err, user) {
  //   if (err) { return done(err, false); }

  //   if (user) {
  //     done(null, user);
  //   } else {
  //     done(null, false);
  //   }
  // });

// tell passport to use strategy
passport.use(jwtLogin);
passport.use(localLogin);

