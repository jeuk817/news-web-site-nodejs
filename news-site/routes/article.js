const express = require('express');
const router = express.Router();

const NewsEditor = require('../model/newsEditor');
const newsEditor = new NewsEditor();

const { isLoggedIn, isNotLoggedIn, loginConfig } = require('./middlewares');

router.get('/:id', loginConfig, async (req, res, next) => {
    const article = await newsEditor.getArticleById(req.params.id);
    res.render('article', { user: req.user, article });
});

router.post('/emotion', loginConfig, async (req, res, next) => {
    const { emotion, _id, state } = req.body;
    // const updatedNum = await newsEditor.updateEmotion(emotion, _id, state);
    // res.send(String(updatedNum));
})

module.exports = router;