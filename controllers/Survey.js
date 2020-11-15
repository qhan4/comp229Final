var mongoose = require("mongoose");
var Survey = require("../models/Surveys");

var surveyController = {};

//mongoose.set('useFindAndModify', false);

surveyController.index = function(req, res, next) {

  // if(!req.user)
  //   {
  //     res.redirect('/');
  //   } else {

  mongoose.model('Survey').find({}).sort({ name: 1 }).exec(function (err, surveys) {
    if (err) {
      return console.error(err);
    } else {
      res.format({
        html: function(){
          res.render('./survey/index', { title: 'All Surveys', page:'All Surveys', menuId:'Survey', surveys: surveys});
        },
        json: function(){
          res.json(contacts);
        }
      });
    }
  });
//}
};

surveyController.new = function(req, res) {
  res.render('./survey/new',{ title: 'New Survey', page:'New Survey', menuId:'survey'});
};

surveyController.create = function(req, res) {
  var title = req.body.title
  var q1 = req.body.q1;
  var q2 = req.body.q2;
  var q3 = req.body.q3;
  var active = "false";

  mongoose.model('Survey').create({
    title: title,
    q1 : q1,
    q2 : q2,
    q3 : q3,
    active: active
  }, function (err, contacts) {
    if (err) {
      return console.error(err);
    } else {
      res.redirect('/survey/index');
    }
  });
};


surveyController.edit = function(req, res) {

  mongoose.model('Survey').findById(req.params.id, function (err, survey){
    if (err) {
      return console.error(err);
    } else {
      res.render('./survey/edit',{ title: 'Edit Survey', page:'Edit Survey', menuId:'Survey', survey: survey});
    }
  });


};

surveyController.update = function(req, res) {
  var title = req.body.title
  var q1 = req.body.q1;
  var q2 = req.body.q2;
  var q3 = req.body.q3;

  mongoose.model('Survey').findByIdAndUpdate(req.params.id, { $set: {title: title, q1: q1, q2: q2, q3: q3}}, function(err, contact) {
    if (err) {
      return console.error(err);
    } else {
      //res.send("Successfully Updated Contact");
      res.redirect('/survey/index');
    }
  });
};

surveyController.delete = function(req, res) {
  mongoose.model('Survey').remove({_id: req.params.id}, function(err, contact) {
    if (err) {
      return console.error(err);
    } else {
      //res.send("Successfully Deleted Contact");
      res.redirect('/survey/index');
    }
  });
};

surveyController.active = function(req, res) {

  mongoose.model('Survey').updateMany({active: true}, {
      $set: {
        active: false
      }},
      function(err, contact) {
        if (err) {
          return console.error(err);
        } else {
          mongoose.model('Survey').findByIdAndUpdate(req.params.id, { $set: {active: true}}, function(err, contact) {
            if (err) {
              return console.error(err);
            } else {
              //res.send("Successfully Updated Contact");
              res.redirect('/survey/index');
            }
          });
        }
      });


  // mongoose.model('Survey').findByIdAndUpdate(req.params.id, { $set: {active: true}}, function(err, contact) {
  //   if (err) {
  //     return console.error(err);
  //   } else {
  //     //res.send("Successfully Updated Contact");
  //     res.redirect('/survey/index');
  //   }
  // });
};



module.exports = surveyController;
