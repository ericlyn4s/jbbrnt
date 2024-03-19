const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),

      //Format time as Jun 10th, 2020 at 5:30 pm
      get: time => {
        return time.toLocaleString() 
      },
    },
    username: {
        type: String
    },
 
    reaction: [reactionSchema],
  },
  {
    id: false,
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// Create a virtual property `friendCount` that gets the amount of comments per post
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reaction.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
