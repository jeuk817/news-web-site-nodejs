const GoogleStrategy = require('passport-google-oauth20');

const UserCollection = require('../schemas/user');

/*
구글 로그인 시 실행2
구글 api에서 생성한 클라이언트 아이디와 시크릿을 .env에 넣어서 가져옴. passport.use의 두번째 인자인 콜백함수 실행후 첫번째 인자의 callbackURL에 적힌 URL로 redirect한다(routes/user.js에 있다.).
두번째 콜백에 매개변수로 accessToken과 refreshToken이 넘어오지만(refreshToken은 passport.authenticate에 accessType: 'offline'를 추가해야지 온다.), 이 app에서는 쓰일 일이 없으므로 사용하지 않고 token에 유저정보를 넣어서 브라우저로 보낸다.
*/

// 구글 로그인시 DB에 이미 저장되어있으면 그 정보를 가지고 로그인하고, 없으면 DB에 추가하고 로그인합니다.
module.exports = passport => {
    passport.use(new GoogleStrategy({
        callbackURL: '/users/google/redirect',
        clientID: process.env.MY_CLIENT_ID,
        clientSecret: process.env.MY_CLIENT_SECRET
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const exUser = await UserCollection.findOne({ id: profile.id });
            if (exUser) {
                console.log('있는 아이디');
                done(null, exUser);
            } else {
                let newUser = new UserCollection({ id: profile.id, displayName: profile.displayName, picture: profile.photos[0].value, provider: profile.provider });
                newUser.save((err, account) => {
                    if (err) return console.error(err);
                })
                done(null, newUser)
            }
        } catch (err) {
            console.error(err);
            done(err);
        }
    }))
}
