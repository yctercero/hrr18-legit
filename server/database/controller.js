var Sequelize = require('sequelize');
var db = require('./database_config.js');

var Assignment = require('./models/assignment.js');
var Section = require('./models/section.js');
var Student = require('./models/student.js');
var User = require('./models/user.js');

var models = {
  assignments: Assignment,
  classes: Section,
  students: Student,
  users: User
};

// 1. given a user id, return all sections (classes) for that user
// 2. given a section (class) id, return all students and assignments
// 3. given an assignment id and student id, return the maximum score for that
//    assignment and the student's individual score.

// ============================================================================
//
// Join Student and Assignment records in the table 'Student_Outcomes', which
// includes fields 'studentId', 'assignmentId', and 'score', and provides the
// method 'addAssignment(assignment, {score: x})' to Student instances

var Student_Outcomes = db.define('Student_Outcomes', {
  score: Sequelize.INTEGER
});

Student.belongsToMany(Assignment, {
  through: Student_Outcomes
});

Assignment.belongsToMany(Student, {
  through: Student_Outcomes
});

// ============================================================================
//
// While sections (classes) have many assignments, assignments have only one
// section. The following adds 'sectionId' to each Assignment record, and
// provides the method 'getAssignments' to Section instances

Section.hasMany(Assignment);

// ============================================================================
//
// Because the same students may belong to many classes, create another join
// table 'Student_Roster' which includes fields 'sectionId' and 'studentId',
// and provides the method "getStudents" to Section instances, and the method
// 'getSections' to Student instances

Student.belongsToMany(Section, {
  through: 'Student_Roster'
});

Section.belongsToMany(Student, {
  through: 'Student_Roster'
});

// ============================================================================
//
// While users (teachers) have many sections (classes), sections have only one
// user. The following adds ''



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

};