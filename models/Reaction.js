const { Schema, Types } = require('mongoose');

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
      default: Date.now(),

      //Format time as Jun 10th, 2020 at 5:30 pm
      get: time => {
        return time.toLocaleString() 
      },
    },
  },
  {
    id: false,
    toJSON: {
      getters: true,
    },
  }
);

module.exports = reactionSchema;
