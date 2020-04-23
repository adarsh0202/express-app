var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Application',courses:["Java","Node JS","AWS","Python"]});
});

module.exports = router;
