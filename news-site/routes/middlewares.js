// req.isAuthenticated()는 로그인상태면 true를 return합니다.

// 로그인상태면 다음 미들웨어로 넘깁니다.
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

// 로그아웃상태가 아니면 다음 미들웨어로 넘깁니다.
// 로그인상태면 홈으로 redirect합니다.
exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}
