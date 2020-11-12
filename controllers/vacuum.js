var mongoose = require("mongoose");
var Vacuum = require("../models/Vacuums");

var vacuumController = {};


vacuumController.create = function(req, res) {
  var why = req.body.why;
  var performance = req.body.performance;
  var hepa = req.body.hepa;

  mongoose.model('Vacuum').create({
    why : why,
    performance : performance,
    hepa : hepa
  }, function (err, contacts) {
    if (err) {
      return console.error(err);
    } else {
      res.redirect('/');
    }
  });
};



module.exports = vacuumController;
