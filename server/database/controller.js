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
// 2. given a section id, return all students
// 3. given a section id, return all assignments
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
//    instances and the following methods:
//
//    - User.getSections() -> returns an array of associated Sections
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
//    following methods:
//
//    - Section.getStudents() -> returns an array of associated Students
//    - Section.addStudent() -> associate this Section with a Student
//
//    - Student.getSections() -> returns an array of associated Sections
//

Section.belongsToMany(Student, {
  through: 'Student_Roster'
});

Student.belongsToMany(Section, {
  through: 'Student_Roster'
});

// ============================================================================
//
// 3. given a class id, return a list of assignments:
//
//    While sections (classes) have many assignments, assignments each have
//    only one section. The following adds 'sectionId' to each Assignment
//    record, and provides the following methods:
//
//    - Section.getAssignments() -> return an array of associated Assignments
//

Section.hasMany(Assignment);

// ============================================================================
//
// 4. given a student id and an assignment id, return the maximum score for
//    that assignment and the student's individual score:
//
//    The join table 'Student_Outcomes' will include fields 'studentId',
//    'assignmentId', and 'score', and provides the following methods:
//
//    - Student.getAssignments() -> return an array of associated Assignments
//    - Student.addAssignment() -> insert a record into Student_Outcomes*
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

module.exports = {

// ============================================================================
//
// POST ENROL: associate one student with one section
//

  enrol: function (req, res) {
    Student
    .findOne({
      where: {
        id: req.body.StudentId
      }
    }).then(function (student) {
      if (student) {
        Section
        .findOne({
          where: {
            id: req.body.SectionId
          }
        })
        .then(function (section) {
          if (section) {
            section
            .addStudent(student)
            .then(function (conf) {
              res.json(conf);
            })
            .catch(function (err) {
              throw err;
            });
          } else {
            console.log('no matching class records found');
            res.sendStatus(404);
          }
        })
        .catch(function (err) {
          throw err;
        })
      } else {
        console.log('no matching student records found');
        res.sendStatus(404);
      }
    })
    .catch(function (err) {
      throw err;
    });
  },

// ============================================================================
//
// POST OUTCOME: associate one student with one assignment, and report the
//               student's individual score. Accepts a data object containing
//               StudentId, AssignmentId, and score
//

  outcome: function (req, res) {
    Student
    .findOne({
      where: {
        id: req.body.StudentId
      }
    })
    .then(function (student) {
      if (student) {
        Assignment
        .findOne({
          where: {
            id: req.body.AssignmentId
          }
        })
        .then(function (assignment) {
          if (assignment) {
            student.addAssignment(assignment, {
              score: req.body.score
            })
            .then(function (conf) {
              res.json(conf);
            })
            .catch(function (err) {
              throw err;
            })
          } else {
            console.log('no matching assignment records found');
            res.sendStatus(404);
          }
        })
        .catch(function (err) {
          throw err;
        });
      } else {
        console.log('no matching student records found');
        res.sendStatus(404);
      }
    })
    .catch(function (err) {
      throw err;
    });
  },

// ============================================================================
//
// GET ALL: return an array with all records of type :model
//

  all: function (req, res) {

    var model = req.params.model;

    models[model]
    .findAll()
    .then(function (found) {
      if (found) {
        res.json(found);
      } else {
        console.log('no matching records found in ' + model);
        res.sendStatus(404);
      }
    })
    .catch(function (err) {
      throw err;
    });
  },

// ============================================================================
//
// GET ONE: return a record for :model with :id
//
//  every response includes a details object
//
//  for instances of User, the JSON response includes:
//
//    - sections: an array of sections associated with the User
//
//  for instances of Section (class):
//
//    - students: an array of students associated with the Section
//    - assignments: an array of assignments associated with the Section
//        - average: a number represeting the average score of all students
//
//  for instances of Student:
//
//    - sections: an array of sections associated with the Student
//    - assignments: an array of assignments associated with the Student
//        - score: the Student's individual score for each Assignment
//
//  for instances of Assignment:
//
//    - average: a number representing the average score of all Students
//    - students: an array of individual student outcomes
//

  one: function (req, res) {

    var model = req.params.model;
    var id = req.params.id;

    if (id) {
      models[model]
      .findOne({
        where: {
          id: id
        }
      })
      .then(function (found) {
        if (found) {

          var aggregate = {
            details: found
          };

// ============================================================================
//
// switch case: users
//

          if (model === 'users') {

            found
            .getSections({
              attributes: ['id', 'name', 'grade', 'subject'],
              joinTableAttributes: []
            })
            .then(function (sections) {
              aggregate.classes = sections;
              res.json(aggregate);
            })
            .catch(function (err) {
              throw err;
            });

// ============================================================================
//
// switch case: classes
//

          } else if (model === 'classes') {

            found
            .getAssignments({
              attributes: ['id', 'name','maxScore']
            })
            .then(function (assignments) {
              aggregate.assignments = assignments;
              found.getStudents({
                attributes: ['id', 'first','last'],
                joinTableAttributes: []
              })
              .then(function (students) {
                aggregate.students = students;
                res.json(aggregate);
              })
              .catch(function (err) {
                throw err;
              });
            })
            .catch(function (err) {
              throw err;
            });

// ============================================================================
//
// switch case: students
//

          } else if (model === 'students') {

            found
            .getSections({
              attributes: ['id', 'name','grade', 'subject'],
              joinTableAttributes: []
            })
            .then(function (sections) {
              aggregate.classes = sections;
              found.getAssignments({
                attributes: ['id', 'name','maxScore'],
                joinTableAttributes: ['score']
              })
              .then(function (assignments) {
                aggregate.assignments = assignments;
                res.json(aggregate);
              })
              .catch(function (err) {
                throw err;
              });
            })
            .catch(function (err) {
              throw err;
            });

// ============================================================================
//
// switch case: assignments
//

          } else if (model === 'assignments') {

            found
            .getStudents({
              attributes: ['id', 'first', 'last'],
              joinTableAttributes: ['score']
            })
            .then(function (students) {
              aggregate.average = students.reduce(function (total, individual) {
                return total += individual.Student_Outcomes.score;
              }, 0) / students.length;
              aggregate.students = students;
              res.json(aggregate);
            })
            .catch(function (err) {
              throw err;
            })
          }
        } else {
          console.log('no records matching id: ' + id + ' in ' + model);
          res.sendStatus(404);
        }
      })
      .catch(function (err) {
        throw err;
      });

// ============================================================================
//
// POST ONE: create a new record of type :model
//

    } else {
      models[model]
      .create(req.body)
      .then(function (conf) {
        res.json(conf);
      })
      .catch(function (err) {
        throw err;
      });
    }
  },

// ============================================================================
//
// PUT MOD: update one record of type :model with :id. Accepts a data object
//          with new associations / definitions for the given :model with :id
//

  mod: function (req, res) {

    var model = req.params.model;
    var id = req.params.id;

    models[model]
    .update(req.body, {
      where: {
        id: id
      }
    }).then(function (found) {
      if (found) {
        res.json(found);
      } else {
        console.log('no records matching id: ' + id + ' in ' + model);
        res.sendStatus(404);
      }
    })
    .catch(function (err) {
      throw err;
    });
  }

};