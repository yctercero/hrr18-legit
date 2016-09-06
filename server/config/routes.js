

module.exports = function (app, express) {

  app.get('/api/users', function(req, res) {
    var allUsers = Users.getAll();
    res.send(allUsers);
  });

  app.get('/api/users/:id', function(req, res) {
    var oneUser = Users.getOne(req.params.id);
    res.send(oneUser);
  });

  app.post('/api/users', function(req, res) {
    var newUser = Users.addOne(req.body);
    res.status(201).send(newUser);
  });

  app.put('/api/users/:id', function(req, res) {
    var updatedUser = Users.updateOne(req.params.id, req.body);
    res.send(updatedUser);
  });

  app.delete('/api/users/:id', function(req, res) {
    var deletedUser = Users.deleteOne(req.params.id);
    res.send(deletedUser);
  });

};