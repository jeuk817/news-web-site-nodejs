const LocalStrategy = require('passport-local').Strategy;

const UserCollection = require('../schemas/user');

// passport.use의 첫번째인자로 LocalStrategy를 인스턴스하면 클라이언트로부터 입력된 로그인값을 가져와 다음 인자로 넘겨줍니다.
// 두 번째 인자인 콜백함수는 LocalStrategy를 통해 받아온 입력값을 가지고 DB를 조회해 로그인전략을 실행합니다.
// 로그인이 실패하거나 성공했을 시 done함수에 각각 다른 매개변수를 입력하여 호출합니다. done이 호출된 후 다시 라우터에서 passport.authenticate의 콜백함수를 실행합니다.
module.exports = passport => {
    passport.use(new LocalStrategy({
        usernameField: 'inputID',
        passwordField: 'inputPwd',
    }, async (inputID, inputPwd, done) => {
        try {
            const exUser = await UserCollection.findOne({ id: inputID });
            if (exUser) {
                const result = inputPwd === exUser.pwd;
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                }
            } else {
                done(null, false, { message: '없는 ID입니다.' })
            }
        } catch (err) {
            console.error(err);
            done(err);
        }
    }))
}
