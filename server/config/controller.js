var models = {
  assignments: require('../models/assignment.js'),
  classes: require('../models/section.js'),
  students: require('../models/student.js'),
  users: require('../models/user.js')
};

module.exports = {

  // GET returns all records of type :model

  all: function (req, res) {
    models[req.params.model]
    .findAll()
    .then(function (data) {
      res.send(data);
    });
  },

  // GET returns one record of type :model with :id
  // POST creates one record of type :model

  one: function (req, res) {
    models[req.params.model]
    .findOrCreate({
      where: req.params.id ? {
        id: req.params.id
      } : {
        name: req.body.name,
        grade: req.body.grade,
        subject: req.body.subject
      }
    }).then(function (data) {
      res.send(data);
    });
  },

  // PUT updates one record of type :model with :id

  mod: function (req, res) {
    models[re.params.model]
    .update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.send(data);
    });
  }

  // GET returns all students and assignments for :section

  // outcomes: function (req, res) {
  //   var students = [];
  //   var assignments = [];
  // }

};