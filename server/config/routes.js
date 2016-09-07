var path = require('path');
var Controller = require('../database/controller.js');
var Auth = require('./authentication.js');

module.exports = function (app, express) {

  // post requests to signin / singup
  app.post('/signin', Auth.signin);
  app.post('/signup', Auth.signup);

  // get (retrieve) all :models
  app.get('/api/:model/', Controller.all);

  // get (retrieve) one :model with :id
  app.get('/api/:model/:id', Controller.one);

  // post (create) one :model
  app.post('/api/:model', Controller.one);

  // put (update) one :model with :id
  app.put('/api/:model/:id', Controller.mod);

  // fixme -->  need to query students and assignments with a
  //            class id - why not have a single route to handle both?

  // for React-Router
  app.all('/*', function(req, res) {
    res.sendFile('index.html', {
      root: path.resolve(__dirname, '../../client')
    });
  });

};