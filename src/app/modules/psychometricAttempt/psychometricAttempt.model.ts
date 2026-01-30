//

import mongoose from 'mongoose';
import { IPsychometricAttempt } from './psychometricAttempt.interface';

//=================================psychometricAttempt===================

const psychometricAttemptSchema = new mongoose.Schema<IPsychometricAttempt>(
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
    keyStrength: {
      type: String,
    },
    areaImprovements: {
      type: String,
    },
    overallFeedback: {
      type: String,
    },
  },
  { timestamps: true },
);

const PsychometricAttempt = mongoose.model(
  'PsychometricAttempt',
  psychometricAttemptSchema,
);
export default PsychometricAttempt;
