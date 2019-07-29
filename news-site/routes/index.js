var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('login');
});

router.get('/signUp', function (req, res, next) {
  res.render('signup');
});

module.exports = router;
