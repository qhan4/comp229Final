var mongoose = require("mongoose");
var Vacuum = require("../models/Vacuums");

var vacuumController = {};


vacuumController.index = function(req, res, next) {

  // if(!req.user)
  //   {
  //     res.redirect('/');
  //   } else {

  mongoose.model('Vacuum').find({}).sort({ name: 1 }).exec(function (err, vacuums) {
    if (err) {
      return console.error(err);
    } else {
      res.format({
        html: function(){
          res.render('./vacuum/index', { title: 'All Vacuum', page:'All Vacuum', menuId:'Vacuum', vacuums: vacuums});
        },
        json: function(){
          res.json(contacts);
        }
      });
    }
  });
//}
};

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


vacuumController.edit = function(req, res) {

  mongoose.model('Vacuum').findById(req.params.id, function (err, vacuum){
    if (err) {
      return console.error(err);
    } else {
      res.render('./vacuum/edit',{ title: 'Edit Vacuum', page:'Edit Vacuum', menuId:'Vacuum', vacuum: vacuum});
    }
  });


};

vacuumController.update = function(req, res) {
  var why = req.body.why;
  var performance = req.body.performance;
  var hepa = req.body.hepa;

  mongoose.model('Vacuum').findByIdAndUpdate(req.params.id, { $set: {why: why, performance: performance, hepa: hepa}}, function(err, contact) {
    if (err) {
      return console.error(err);
    } else {
      //res.send("Successfully Updated Contact");
      res.redirect('/vacuum/index');
    }
  });
};

vacuumController.delete = function(req, res) {
  mongoose.model('Vacuum').remove({_id: req.params.id}, function(err, contact) {
    if (err) {
      return console.error(err);
    } else {
      //res.send("Successfully Deleted Contact");
      res.redirect('/vacuum/index');
    }
  });
};


module.exports = vacuumController;
