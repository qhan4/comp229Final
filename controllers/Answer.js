var mongoose = require("mongoose");
var Answer = require("../models/Answers");
var Survey = require("../models/Surveys");


var answerController = {};


answerController.index = function(req, res, next) {

  // if(!req.user)
  //   {
  //     res.redirect('/');
  //   } else {

  mongoose.model('Answer').find({
    sid: req.params.id
  }).exec(function(err, answers) {
    if (err) {
      return console.error(err);
    } else {
      mongoose.model('Survey').findById(req.params.id, function(err, survey) {
        if (err) {
          return console.error(err);
        } else {
          res.format({
            html: function() {
              res.render('./answer/index', {
                title: 'All Answers for ' + survey.title,
                page: 'All Answers for ' + survey.title,
                menuId: 'Answer',
                answers: answers,
                survey: survey
              });
            }
          });
        }
      });
    }
  });
};

answerController.create = function(req, res) {
  var a1 = req.body.a1;
  var a2 = req.body.a2;
  var a3 = req.body.a3;
  var sid = req.body.sid;

  mongoose.model('Answer').create({
    a1: a1,
    a2: a2,
    a3: a3,
    sid: sid
  }, function(err, contacts) {
    if (err) {
      return console.error(err);
    } else {
      res.redirect('/');
    }
  });
};


answerController.edit = function(req, res) {

  mongoose.model('Answer').findById(req.params.id, function(err, answer) {
    if (err) {
      return console.error(err);
    } else {
      mongoose.model('Survey').findById(answer.sid, function(err, survey) {
        if (err) {
          return console.error(err);
        } else {
          res.format({
            html: function() {
              res.render('./answer/edit', {
                title: 'Edit Answer',
                page: 'Edit Answer',
                menuId: 'Answer',
                answer: answer,
                survey: survey
              });
            }
          });
        }
      });
    }
  });


};

answerController.update = function(req, res) {
  var a1 = req.body.a1;
  var a2 = req.body.a2;
  var a3 = req.body.a3;

  mongoose.model('Answer').findByIdAndUpdate(req.params.id, {
    $set: {
      a1: a1,
      a2: a2,
      a3: a3
    }
  }, function(err, answer) {
    if (err) {
      return console.error(err);
    } else {
      //res.send("Successfully Updated Contact");
      res.redirect('/answer/' + answer.sid + '/index');
    }
  });
};

answerController.delete = function(req, res) {
  mongoose.model('Answer').findOneAndDelete({
    _id: req.params.id
  }, function(err, answer) {
    if (err) {
      return console.error(err);
    } else {
      //res.send("Successfully Deleted Contact");
      res.redirect('/answer/' + answer.sid + '/index');
    }
  });
};


module.exports = answerController;
