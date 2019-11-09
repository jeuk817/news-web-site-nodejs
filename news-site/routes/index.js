var express = require('express');
const { isLoggedIn, isNotLoggedIn, loginConfig } = require('./middlewares');
const NewsEditor = require('../model/newsEditor');
const newsEditor = new NewsEditor();

var router = express.Router();

// 홈페이지: 로그인상태라면 loginConfig혹은 passport에서 req.user에 유저정보가 담겨서 옵니다.
router.get('/', loginConfig, async (req, res, next) => {
  const mainArticle = await newsEditor.getMainArticle();
  const articles = await newsEditor.getArticles('해외');
  res.render('homePage', { user: req.user, articles, mainArticle });
});

// 홈페이지 테마뉴스 표시
router.get('/thema/:thema', loginConfig, (req, res, next) => {
  console.log(req.params.thema, "thema");
  const articles = newsEditor.getArticles('해외');
  res.render('homePage', { user: req.user, articles });
});

// 로그인페이지
router.get('/loginPage', isNotLoggedIn, function (req, res, next) {
  res.render('login', { note: req.flash('note') });
});

// 회원가입페이지
router.get('/signUp', isNotLoggedIn, function (req, res, next) {
  res.render('signup');
});

module.exports = router;
