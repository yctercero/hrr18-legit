var Controller = require('./controller.js')

module.exports = function (app, express) {

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

  //app.get('api/outcomes/:section', Controller.outcomes);

};