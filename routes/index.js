var express = require('express');
var router = express.Router();

var vacuum = require("../controllers/vacuum.js");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Survey Site FA229', page:'Home', menuId:'home' });
});

module.exports = router;


router.post('/vacuum/new', vacuum.create);
router.get('/vacuum/index', vacuum.index);
router.get('/vacuum/:id/edit',  vacuum.edit);
router.post('/vacuum/:id/edit',  vacuum.update);
router.post('/vacuum/:id/delete',  vacuum.delete);
