var express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');


var mongoose = require("mongoose");
var Survey = require("../models/Surveys");

var auth = require("../controllers/AuthController.js");
var survey = require("../controllers/Survey.js");
var authenticated;

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(Boolean(connectEnsureLogin.ensureLoggedIn()));
  if(req.isAuthenticated === true){
    authenticated = "1";
  } else if (req.isAuthenticated === false) {
    authenticated = "0";
  }
  console.log(req.user);
  //res.render('index', { title: 'Survey Site FA229', page:'Home', menuId:'home', authenticated: authenticated });

  mongoose.model('Survey').findOne({active: true}, function (err, survey){
    if (err) {
      return console.error(err);
    } else {
      res.render('index', { title: 'Survey Site FA229', page:'Home', menuId:'home', survey: survey });
    }
  });
});



router.get('/survey/new', survey.new);
router.post('/survey/new', survey.create);
router.get('/survey/index', survey.index);
router.get('/survey/:id/edit',  survey.edit);
router.post('/survey/:id/edit',  survey.update);
router.post('/survey/:id/delete',  survey.delete);
router.get('/survey/:id/active',  survey.active);


// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);

// route for logout action
router.get('/logout', auth.logout);


module.exports = router;
