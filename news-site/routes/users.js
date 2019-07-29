var express = require('express');
var router = express.Router();
const DB = require('../schemas/index');
const db = new DB();
const testC = db.userCollection();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signUp', (req, res, next) => {
  const { id, pwd } = req.body;
  db.connect();
  let test = new testC({ id, pwd });
  test.save((err, account) => {
    if (err) return console.error(err);
  })
})

module.exports = router;
