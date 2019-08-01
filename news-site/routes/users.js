const express = require('express');
const router = express.Router();

const UserCollection = require('../schemas/user');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 회원가입버튼 클릭시 실행
// 입력값 id,pwd를 받아와 DB에 저장합니다. 그후 로그인페이지로 redirect
router.post('/signUp', isNotLoggedIn, (req, res, next) => {
  const { id, pwd } = req.body;
  let newUser = new UserCollection({ id, pwd });
  newUser.save((err, account) => {
    if (err) return console.error(err);
  })
  res.redirect('/loginPage');
})

// ID중복확인버튼 클릭시 실행
// 입력값 id를 받아와 DB를 조회해 이미 있는 계정인지 확인하여 있으면 no 없으면 yes를 send합니다.
router.post('/identification', isNotLoggedIn, async (req, res, next) => {
  const { id } = req.body;
  try {
    const users = await UserCollection.find({ id });
    if (users.length) {
      res.send('no');
    } else {
      res.send('yes')
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
})

module.exports = router;
