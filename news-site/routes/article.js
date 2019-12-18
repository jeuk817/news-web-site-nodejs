const express = require('express');
const router = express.Router();

const NewsEditor = require('../model/newsEditor');
const newsEditor = new NewsEditor();

const { isLoggedIn, isNotLoggedIn, loginConfig } = require('./middlewares');

// 읽을 기사를 가져오는 라우터
router.get('/read/:id', loginConfig, async (req, res, next) => {
    try {
        const article = await newsEditor.getArticleById(req.params.id);
        res.render('article', { user: req.user, article });
    } catch (err) {
        next(err);
    }
});

// 수정할 기사가져오는 라우터
router.get('/targetToEdit/:id',isLoggedIn, async (req, res, next) => {
    try {
        const article = await newsEditor.getArticleById(req.params.id);
        // throw new Error('에러발생')
        res.json(article);
    } catch (err) {
        next(err);
    }
})

// 사용자가 감정표현을 클릭했을 때 실행
router.post('/emotion', isLoggedIn, async (req, res, next) => {
    try {
        // 사용자가 클릭한 감정표현과 기사의 _id를 받는다.
        const { emotion, article_id } = req.body;
        // db에 감정표현을 업데이트하고 변경된 감정표현들의 수를 배열로 받는다.
        const updatedEmotions = await newsEditor.updateEmotion({article_id, user_id: req.user._id, emotion});
        res.send(updatedEmotions);
    } catch(err) {
        next(err);
    }
});

router.post('/comment', isLoggedIn, async (req, res, next) => {
    try {
        const {article_id, content} = req.body;
        const updatedCommentsObject = await newsEditor.createComment({article_id, user_id: req.user._id, content, displayName: req.user.displayName});
        res.json(updatedCommentsObject);
    } catch(err) {
        next(err);
    }
})

module.exports = router;