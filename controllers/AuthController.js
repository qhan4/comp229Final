var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/Users");

var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
  res.render('index', { user : req.user });
};

// Go to registration page
userController.register = function(req, res) {
  res.render('register',{ title: 'Register', page:'Register', menuId:'register'});
};

// Post registration
userController.doRegister = function(req, res) {
  User.register(new User({ username : req.body.username, email: req.body.email }), req.body.password, function(err, user) {
    if (err) {
      //return res.render('register', { user : user, title: 'Register', page:'Register', menuId:'register' });
      return console.error(err);
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};

// Go to login page
userController.login = function(req, res) {
  res.render('login',{ title: 'Login', page:'Login', menuId:'login'});
};



userController.doLogin = function(req, res, next)  {
  passport.authenticate('local',
  (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect('/login?info=' + info);
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      return res.redirect('/');
    });

  })(req, res, next);
};


userController.edit = function(req, res) {

  mongoose.model('User').findById(req.user._id, function (err, profile){
    if (err) {
      return console.error(err);
    } else {
      res.render('edit',{ title: 'Edit Profile', page:'Edit Profile', menuId:'Profile', profile: profile});
    }
  });


};

userController.update = function(req, res) {
  var email = req.body.email;

  mongoose.model('User').findByIdAndUpdate(req.params.id, { $set: {email: email}}, function(err, contact) {
    if (err) {
      return console.error(err);
    } else {
      //res.send("Successfully Updated Contact");
      res.redirect('edit');
    }
  });
};




// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};


module.exports = userController;
