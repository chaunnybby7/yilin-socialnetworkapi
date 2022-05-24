const { Schema, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema ({
    // Set ID to avoid mix up with parent throughts ID
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        require: true,
        maxLength: 280
    },
    username: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm:a')
    }
    }, {
        toJSON: {
            getters: true
        },
        id: false
    });

    module.exports = reactionSchema;