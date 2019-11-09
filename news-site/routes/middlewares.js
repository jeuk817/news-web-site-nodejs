const jwt = require('jsonwebtoken');

// req.isAuthenticated()는 로그인상태면 true를 return합니다.

// 1. session을 이용한 로그인이면 next() 2. token을 이용한 로그인이면 req.user에 유저정보 세팅후 next() 3. 로그인 상태가 아니라면 로그인페이지로 redirect
exports.isLoggedIn = async (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log('session login')
        return next();
    } else {
        try {
            const token = req.cookies.token;
            if (!token) {
                req.flash('Inaccessible', '접근권한이 없습니다.');
                return res.redirect('/loginPage')
            }
            console.log('token login success')
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodedToken;
            return next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                req.flash('Inaccessible', '로그인 시간이 초과되었습니다.');
                return res.redirect('/loginPage')
            }
            req.flash('Inaccessible', '유효하지 않은 로그인입니다.');
            return res.redirect('/loginPage');
        }
    }
};

// 1. session과 token이 둘다 없거나 유효기간이 지났다면 next() 2. session이나 token이 있거나 유효하지 않은 토큰이라면 홈페이지로 redirect
exports.isNotLoggedIn = async (req, res, next) => {
    if (!req.isAuthenticated()) {
        try {
            const token = req.cookies.token;

            if (!token) {
                // session, token 둘다 로그아웃 상태일 때
                return next();
            }
            // token 로그인 상태일 때
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodedToken;
            req.flash('Inaccessible', '이미 로그인하셨습니다.');
            return res.redirect('/');
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                // 토큰 유효기간이 지난 상태일 때
                return next();
            }
            req.flash('Inaccessible', '유효하지 않은 토큰입니다.');
            return res.redirect('/');
        }
    } else {
        // session 로그인 상태일 때
        req.flash('Inaccessible', '이미 로그인하셨습니다.');
        return res.redirect('/');
        // return res.render('homePage', { user: req.user });
    }
}

// token이 없거나 유효기간이 지났다면 바로 next(), 있다면 req.user에 유저정보 세팅후 next()
exports.loginConfig = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return next();
        }
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        return next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return next();
        }
        return res.status(401).json({
            code: 401,
            message: '유효하지 않은 토큰입니다.'
        });
    }
}
