const mongoose = require('mongoose');
const { Schema } = mongoose;

const comment = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comments', }],
    deletion: {
        type: Boolean,
        default: false,
    },
}, {
        timestamps: {
            createdAt: 'createdAt',
        }
    })

module.exports = mongoose.model('comment', comment, 'comments');