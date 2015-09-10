var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { body: 'Express', title: 'Home page'});
});

module.exports = router;
