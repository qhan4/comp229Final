var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var auth = require("./controllers/AuthController.js");
//var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var mongoose = require('mongoose');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport and sessions
const bodyParser = require('body-parser');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);

/*  PASSPORT SETUP  */

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//MongoDB config
mongoose.Promise = global.Promise;

mongoose.connect("mongodb+srv://comp229:comp229@cluster0.oqxxs.mongodb.net/COMP229-Final?retryWrites=true&w=majority")
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


var User = require('./models/Users');
//passport.use(new LocalStrategy(User.authenticate()));
// passport.use(new LocalStrategy({
//         usernameField: 'username',
//         passwordField: 'password'
//     },
//     function (email, password, cb) {
//         //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
//         return User.findOne({email, password})
//            .then(user => {
//                if (!user) {
//                    return cb(null, false, {message: 'Incorrect username or password.'});
//                }
//                return cb(null, user, {message: 'Logged In Successfully'});
//           })
//           .catch(err => cb(err));
//     }
// ));


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

/* PASSPORT LOCAL AUTHENTICATION */

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = app;
