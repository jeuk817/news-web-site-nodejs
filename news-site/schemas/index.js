const mongoose = require('mongoose');

class DB {
    connect() {
        mongoose.connect('mongodb://localhost', {
            dbName: 'test',
        }, (error) => {
            if (error) {
                console.log('몽고디비 연결 에러', error)
            } else {
                console.log('몽고디비 연결 성공')
            }
        })

        var db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function (callback) {
            console.log('DB가 열렸습니다.');
        });
    }

    userCollection() {
        var testSchema = mongoose.Schema({
            id: String,
            pwd: String,
        })

        return mongoose.model('test', testSchema);
    }
}

module.exports = DB;
