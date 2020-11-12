var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Survey Site FA229', page:'Home', menuId:'home' });
});

module.exports = router;
