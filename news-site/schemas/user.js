// 몽구스 스키마를 만들어 model을 export합니다.
const mongoose = require('mongoose');
const { Schema } = mongoose;


const user = new Schema({
    id: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    pwd: String,
    picture: String,
    provider: {
        type: String,
        default: 'local',
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }]
})

module.exports = mongoose.model('user', user, 'users');