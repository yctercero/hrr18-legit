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

// ============================================================================
//
// 1. given a user id, return all sections (classes) for that user
// 2. given a section (class) id, return all students and assignments
// 3. given a student id and an assignment id, return the maximum score for
//    that assignment and the student's individual score.

// to accomplish these and other tasks, we must harness the awesome power of...

//
//                /$$$$$  /$$$$$$  /$$$$$$ /$$   /$$  /$$$$$$
//               |__  $$ /$$__  $$|_  $$_/| $$$ | $$ /$$__  $$
//                  | $$| $$  \ $$  | $$  | $$$$| $$| $$  \__/
//                  | $$| $$  | $$  | $$  | $$ $$ $$|  $$$$$$
//             /$$  | $$| $$  | $$  | $$  | $$  $$$$ \____  $$
//            | $$  | $$| $$  | $$  | $$  | $$\  $$$ /$$  \ $$
//            |  $$$$$$/|  $$$$$$/ /$$$$$$| $$ \  $$|  $$$$$$/
//             \______/  \______/ |______/|__/  \__/ \______/
//
// ============================================================================
//
// 1. given a user id, return a list of classes
//
// While users (teachers) have many sections (classes), sections each have only
// one user. The following adds the foreign key 'userId' to Section instances,
// and the following methods to User instances:
//
//    - getSections() -> returns an array of associated Sections
//    - setSections(array) -> associate this user with an array of Sections

User.hasMany(Section);

// ============================================================================
//
// 2. given a class id, return a list of students
//
// 2a. given a student id, return a list of classes
//
// Because students may belong to many classes, a join table 'Student_Roster'
// will include fields 'sectionId' and 'studentId', and provides the following
// to Student instances:
//
//    - getSections() -> returns an array of associated Sections
//
// and to Section instances:
//
//    - getStudents() -> returns an array of associated Students

Student.belongsToMany(Section, {
  through: 'Student_Roster'
});

Section.belongsToMany(Student, {
  through: 'Student_Roster'
});

// ============================================================================
//
// 3. given a class id, return a list of assignments:
//
// While sections (classes) have many assignments, assignments each have only
// one section. The following adds 'sectionId' to each Assignment record, and
// provides the method 'getAssignments' to Section instances

Section.hasMany(Assignment);

// ============================================================================
//
// 4. given a student id and an assignment id, return the maximum score for
//    that assignment, that the student's individual score:
//
// The join table 'Student_Outcomes' will include fields 'studentId',
// 'assignmentId', and 'score', and provides the following methods:
//
// instances of Student:
//
//
// 'addAssignment'
// 'getAssignments' to Student instances

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