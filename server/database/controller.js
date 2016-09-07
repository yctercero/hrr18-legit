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
// 2. given a section (class) id, return all students
// 3. given a section (class) id, return all assignments
// 4. given a student id and an assignment id, return the maximum score for
//    that assignment and the student's individual score.
//
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
//    While users (teachers) have many sections (classes), sections each have
//    only one user. The following adds the foreign key 'userId' to Section
//    instances and the following methods to User instances:
//
//    - getSections() -> returns an array of associated Sections
//    - setSections() -> associate this User with an array of Sections
//

User.hasMany(Section);

// ============================================================================
//
// 2. given a class id, return a list of students
//
// 2a. given a student id, return a list of classes
//
//    Because students may belong to many classes, the table 'Student_Roster'
//    will include fields 'sectionId' and 'studentId', and provides the
//    following to Student instances:
//
//    - getSections() -> returns an array of associated Sections
//    - setSections() -> associate this Student with an array of Sections
//
//    and to Section instances:
//
//    - getStudents() -> returns an array of associated Students
//    - setStudents() -> associate this Section with an array of Students
//

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
//    While sections (classes) have many assignments, assignments each have
//    only one section. The following adds 'sectionId' to each Assignment
//    record, and provides the following method to Section instances:
//
//    - getAssignments() -> return an array of associated Assignments
//

Section.hasMany(Assignment);

// ============================================================================
//
// 4. given a student id and an assignment id, return the maximum score for
//    that assignment, that the student's individual score:
//
//    The join table 'Student_Outcomes' will include fields 'studentId',
//    'assignmentId', and 'score', and provides the following methods to
//    Student instances:
//
//    - addAssignment() -> insert a record into the table of Student_Outcomes*
//    - getAssignments() -> return an array of associated Assignments.
//
//    * usage: Student.addAssignment(Assignment, {score: 0});
//

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

module.exports = {

// ============================================================================
//
// GET ALL: return an array with all records of type :model
//

  all: function (req, res) {
    models[req.params.model]
    .findAll()
    .then(function (found) {
      res.send(found);
    });
  },

// ============================================================================
//
// GET ONE: return a record* of type :model with :id
//
//  * every response includes a details object and a type (table name)
//
//  * for instances of Section (class), the JSON response includes:
//
//    - assignments: an array of assignments associated with the Section,
//    - students: an array of students associated with the Section
//
//  * for instances of Student,
//
//    - sections: an array of sections associated with the Student,
//    - assignments: an array of assignments associated with the Student
//
//  * for instances of User,
//
//    - sections: an array of sections associated with the User
//
// ============================================================================
//
// POST ONE: create a new record of type :model
//

  one: function (req, res) {

    var model = models[req.params.model];
    var id = req.params.id;

    if (id) {
      model.findOne({
        where: {
          id: id
        }
      })
      .then(function (found) {

        if (found) {

          var aggregate = {
            details: found,
            type: found.getTableName()
          };

          if (aggregate.type === 'Section') {

            // include all students and assignments for the given section
            aggregate.assignments = found.getAssignments();
            aggregate.students = found.getStudents();

          } else if (aggregate.type === 'Student') {

            // include all assignments and sections for the given student
            aggregate.assignments = found.getAssignments();
            aggregate.sections = found.getSections();

          } else if (aggregate.type === 'User') {

            // include all sections for the given user
            aggregate.sections = found.getSections();
          }
          res.json(aggregate);
        } else {
          console.log(model + ' with id: ' + id + ' not found');
          res.statusSend(404);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    } else {
      model.create({
        where: req.body
      })
      .then(function (conf) {
        res.send(conf);
      })
      .catch(function (err) {
        console.log(err);
      });
    }
  },

// ============================================================================
//
// PUT MOD: update one record of type :model with :id
//
// *not tested
//

// mod: function (req, res) {
//   models[re.params.model]
//   .update(req.body, {
//     where: {
//       id: req.params.id
//     }
//   }).then(function (found) {
//     res.send(found);
//   });
// }

};