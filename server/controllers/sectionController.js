var Section = require('../models/section.js');

module.exports = {

  getAll: function (req, res) {
    Section.findAll().then(function (data) {
      res.send(data);
    });
  },

  addOne: function (req, res) {
    console.log(req.body);
    Section.findOrCreate({where: {
      name: req.body.name,
      grade: req.body.grade,
      subject: req.body.subject
    }}).then(function (data) {
      res.send(data);
    });
  }

};