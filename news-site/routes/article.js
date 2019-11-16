const express = require('express');
const router = express.Router();

const NewsEditor = require('../model/newsEditor');
const newsEditor = new NewsEditor();

const { isLoggedIn, isNotLoggedIn, loginConfig } = require('./middlewares');

router.get('/:id', loginConfig, async (req, res, next) => {
    const article = await newsEditor.getArticleById(req.params.id);
    res.render('article', { user: req.user, article });
});

// 사용자가 감정표현을 클릭했을 때 실행
router.post('/emotion', loginConfig, async (req, res, next) => {
    // 비 로그인 상태일 때는 로그인페이지 url을 리다이렉트한다.
    if(!req.user) return res.redirect('/loginPage');

    // 사용자가 클릭한 감정표현과 기사의 _id를 받는다.
    const { emotion, article_id } = req.body;
    // db에 감정표현을 업데이트하고 변경된 감정표현들의 수를 배열로 받는다.
    const updatedEmotions = await newsEditor.updateEmotion({article_id, user_id: req.user._id, emotion});
    res.send(updatedEmotions);
});

router.post('/comment', loginConfig, async (req, res, next) => {
    // 비 로그인 상태일 때는 로그인페이지 url을 리다이렉트한다.
    if(!req.user) return res.redirect('/loginPage');

    const {article_id, content} = req.body;
    const updatedCommentsObject = await newsEditor.createComment({article_id, user_id: req.user._id, content, displayName: req.user.displayName});
    res.json(updatedCommentsObject);
})

module.exports = router;