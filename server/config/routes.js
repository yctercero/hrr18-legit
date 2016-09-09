var path = require('path');
var Controller = require('../database/controller.js');
var Auth = require('./authentication.js');
var passport = require('passport');

require('./passport.js')(passport);

const requireAuth = passport.authenticate('jwt', {
  session: false
});

// const requireSignin = passport.authenticate('local', {
//   session: false
// });

module.exports = function (app, express) {

// ============================================================================
//
// POST to signin / singup
//

  //testing passport - working!
  app.get('/test', requireAuth, function(req, res) {
    res.send({hello: 'this is working'});
  });

  //testing passport signin - working!
  app.post('/signin', Auth.signin);
  app.post('/signup', Auth.signup);


// ============================================================================
//
// GET all instances of :model with url parameters; no JSON required
//

  app.get('/api/report/:model', Controller.all);

// ============================================================================
//
// GET :model of :id with url parameters; no JSON required
//

  app.get('/api/report/:model/:id', Controller.one);

// ============================================================================
//
// POST :model with JSON specific to whichever you're creating:
//
//    - users -> {email, password}
//    - classes -> {name, grade, subject, UserId}
//    - students -> {first, last}
//    - assignments -> {name, maxScore, SectionId}
//

  app.post('/api/add/:model', Controller.one);

// ============================================================================
//
// PUT :model of :id with JSON -> {property: 'updated value'}
//

  app.put('/api/update/:model/:id', Controller.mod);

// ============================================================================
//
// POST to student roster with JSON -> {[students], [classes]}
//

  app.put('/api/enrol', Controller.enrol);

// ============================================================================
//
// POST to student outcomes with JSON -> {StudentId, AssignmentId, score}
//

  app.post('/api/outcome', Controller.outcome);

// ============================================================================
//
// Redirect all other requests to React-Router
//

  app.all('/*', function(req, res) {
    res.sendFile('index.html', {
      root: path.resolve(__dirname, '../../client')
    });
  });

};
