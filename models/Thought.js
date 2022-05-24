const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId, 
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String, 
            required: true, 
            maxlength: 280, 
        }, 
        username: { 
            type: String, 
            required: true,
        }, 
        createdAt: {
            type: Date, 
            default: Date.now, 
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
        }
    },
    {
        toJSON: {
            getters: true,
        }
    }
);

// Actual thoughts schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            required: true, 
            minlength: 1, 
            maxlength: 280,
        },
        createdAt: {
            type: Date, 
            default: Date.now, 
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
        },
        username: {
            type: Schema.Types.String, 
            required: true, 
            ref: 'User',
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true, 
        },
        id: false,
        strict: false, 
    }
);

// Create the Thought model using thoughtSchema
const Thought = model('Thought', thoughtSchema)

// Reaction count that retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Export the model
module.exports = Thought;