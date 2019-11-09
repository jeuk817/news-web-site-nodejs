const express = require('express');

const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const articleCollection = require('../schemas/articles');
const upload = require('../services/file-upload');
const singleUpload = upload.single('image')


router.get('/', isLoggedIn, (req, res, next) => {
    res.render('text', { user: req.user });
});

// 글쓰기 저장 시 AWS s3에 이미지를 업로드 후, DB에 기자_id, 기자이름, 기사제목, 이미지URL, 기사내용을 저장합니다.
router.post('/write', isLoggedIn, (req, res, next) => {
    // 첨부파일을 s3 에 저장하는 함수입니다.
    singleUpload(req, res, function (err) {
        if (err) {
            return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] })
        }

        const { title, content, thema } = req.body;
        const newArticle = new articleCollection({
            reporterId: req.user._id,
            reporterName: req.user.displayName,
            thema,
            title,
            pictureUrl: req.file.location,
            content,
        });
        newArticle.save();
        return res.redirect('/user');
    })
});

module.exports = router;
