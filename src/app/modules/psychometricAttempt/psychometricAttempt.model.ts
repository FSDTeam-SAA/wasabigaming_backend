//

import mongoose from 'mongoose';

//=================================psychometricAttempt===================

const psychometricAttemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PsychometricTest',
      required: true,
    },
    answers: [
      {
        questionId: mongoose.Schema.Types.ObjectId,
        userAnswer: String,
        isCorrect: Boolean,
        timeTakenSec: Number,
      },
    ],
    score: {
      type: Number,
      required: true,
    },
    totalTime: {
      type: Number,
    },
  },
  { timestamps: true },
);

const PsychometricAttempt = mongoose.model(
  'PsychometricAttempt',
  psychometricAttemptSchema,
);
export default PsychometricAttempt;
