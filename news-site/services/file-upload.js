const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// aws - 내 보안자격 증명 - 액세스키에서 생성한 키와 s3 bucket을 생성한 region을 환경으로 설정합니다.
aws.config.update({
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY,
    region: 'ap-northeast-2',
})

const s3 = new aws.S3();

// multer에서 파일형식이 이미지인것만 사용하도록 허용하도록하는 함수입니다.
const fileFilter = (req, file, cb) => {
    console.log(file.mimetype)
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
    }
}

// multer의 upload정의입니다.
// fileFilter: 파일형식을 필터링합니다.
// storage: 저장소로 s3 bucket을 사용하도록 설정합니다.
// limits: 한번에 1개의 파일만 업로드하고, 파일사이즈를 5MB로 제한합니다.
const upload = multer({
    fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: 'news-site-circus',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: 'News-picture' });
        },
        key: function (req, file, cb) {
            cb(null, file.originalname + '_' + Date.now().toString())
        }
    }),
    limits: {
        files: 1,
        fileSize: 5 * 1024 * 1024,
    },
})

module.exports = upload;