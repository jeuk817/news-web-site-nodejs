// 몽구스 스키마를 만들어 model을 export합니다.
const mongoose = require('mongoose');
const { Schema } = mongoose;

const testSchema = new Schema({
    id: String,
    pwd: String,
})

module.exports = mongoose.model('test', testSchema);
