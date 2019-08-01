var express = require('express');
var router = express.Router();

// 홈페이지
router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.render('homepage');
});

// 로그인페이지
router.get('/loginPage', isNotLoggedIn, function (req, res, next) {
  res.render('login');
});

// 회원가입페이지
router.get('/signUp', isNotLoggedIn, function (req, res, next) {
  res.render('signup');
});

module.exports = router;
