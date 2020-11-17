var express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');


var mongoose = require("mongoose");
var Survey = require("../models/Surveys");

var auth = require("../controllers/AuthController.js");
var survey = require("../controllers/Survey.js");
var answer = require("../controllers/Answer.js");
var authenticated;

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(Boolean(connectEnsureLogin.ensureLoggedIn()));
  if(req.user == undefined ){
    authenticated = "0";
  } else  {
    authenticated = "1";
  }
  console.log(req.user);
  console.log(authenticated);

  mongoose.model('Survey').findOne({active: true}, function (err, survey){
    if (err) {
      return console.error(err);
    } else {
      res.render('index', { title: 'Survey Site FA229', page:'Home', menuId:'home', survey: survey, authenticated: authenticated, user: req.user });
    }
  });
});



router.get('/survey/new', connectEnsureLogin.ensureLoggedIn(), survey.new);
router.post('/survey/new', connectEnsureLogin.ensureLoggedIn(), survey.create);
router.get('/survey/index', connectEnsureLogin.ensureLoggedIn(), survey.index);
router.get('/survey/:id/edit', connectEnsureLogin.ensureLoggedIn(), survey.edit);
router.post('/survey/:id/edit', connectEnsureLogin.ensureLoggedIn(), survey.update);
router.post('/survey/:id/delete', connectEnsureLogin.ensureLoggedIn(), survey.delete);
router.get('/survey/:id/active',  connectEnsureLogin.ensureLoggedIn(), survey.active);

router.post('/answer/new', answer.create);
router.get('/answer/:id/index', connectEnsureLogin.ensureLoggedIn(), answer.index);
router.get('/answer/:id/edit',  connectEnsureLogin.ensureLoggedIn(), answer.edit);
router.post('/answer/:id/edit',  connectEnsureLogin.ensureLoggedIn(), answer.update);
router.post('/answer/:id/delete',  connectEnsureLogin.ensureLoggedIn(), answer.delete);


// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);

router.get('/:id/edit', connectEnsureLogin.ensureLoggedIn(), auth.edit);

router.post('/:id/edit', connectEnsureLogin.ensureLoggedIn(), auth.update);

// route for logout action
router.get('/logout', auth.logout);


module.exports = router;
