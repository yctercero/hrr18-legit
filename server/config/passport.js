// var passport = require('passport');
// var JwtStrategy = require('passport-jwt').Strategy;
// var ExtractJwt = require('passport-jwt').ExtractJwt;
// var User = require('../database/models/user');
// var secret = 'test';

// // Passport : is the User logged in or not?

// //setup Options for jwt strategy
// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromHeader('authorization'),
//   secretOrKey: 'test'
// };


// // create jwt strategy
// const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
//   // See if user ID in the payload exists in our database
//   User.findById(payload.sub, function(err, user) {
//     if (err) { return done(err, false); }

//     if (user) {
//       done(null, user);
//     } else {
//       done(null, false);
//     }
//   });

// });


// // tell passport to use strategy
// passport.use(jwtLogin);
