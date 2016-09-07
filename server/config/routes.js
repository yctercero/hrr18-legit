// var Users = require('../controllers/userController.js');
var Sections = require('../controllers/sectionController.js');
// var Assignments = require('../controllers/assignmentController.js');
// var Students = require('../controllers/studentController.js');

module.exports = function (app, express) {

  // post new users / classes / assignments

  // app.post('/api/users', Users.addOne);
  app.post('/api/classes', Sections.addOne);
  // app.post('/api/assignmnets', Assignments.addOne);

  // modify existing users / classes / assignments

  // app.put('/api/users/:id', Users.modOne);
  // app.put('/api/classes/:id', Sections.modOne);
  // app.put('/api/assignmnets/:id', Assignments.modOne);

  // get all classes / assignmnets / students

  app.get('/api/classes', Sections.getAll);
  // app.get('/api/assignmnets', Assignments.getAll);
  // app.get('/api/students', Students.getAll);

  // get one user / class / assignment / student

  // app.get('/api/users/:id', Users.getOne);
  // app.get('/api/classes/:id', Sections.getOne);
  // app.get('/api/assignmnets/:id', Assignments.getOne);
  // app.get('/api/students/:id', Students.getOne);

  // get assignments / students using class id

  // app.get('/api/assignmnets/class/:id', Assignments.getClass);
  // app.get('/api/students/class/:id', Students.getClass);

};