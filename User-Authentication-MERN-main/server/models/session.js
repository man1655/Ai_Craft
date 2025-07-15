import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true
    },
    experience: {
      type: String,
      required: true
    },
    topicsToFocus: {
      type: String
    },
    description: {
      type: String
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
      }
    ]
  },
  { timestamps: true }
);

const Session = mongoose.model('Session', sessionSchema);

export default Session;
