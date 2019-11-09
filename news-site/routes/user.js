const express = require('express');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const UserCollection = require('../schemas/user');


router.get('/', isLoggedIn, (req, res, next) => {
    res.render('userPage', { user: req.user });
});

module.exports = router;