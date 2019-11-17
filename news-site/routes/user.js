const express = require('express');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const NewsEditor = require('../model/newsEditor');
const newsEditor = new NewsEditor();


router.get('/', isLoggedIn, (req, res, next) => {
    res.render('userPage', { user: req.user });
});

router.get('/userArticles', isLoggedIn, async (req, res, next) => {
    try{
        const articles = await newsEditor.getUserArticles(req.user.displayName);
        res.json(articles);
    } catch(err){
        console.log(err);
        next(err);
    }
})

module.exports = router;