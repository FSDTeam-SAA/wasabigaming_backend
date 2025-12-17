import { Schema, model } from 'mongoose';
import { IPsychometricTest } from './psychometricTest.interface';

const psychometricTestSchema = new Schema<IPsychometricTest>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    test: {
      type: Schema.Types.ObjectId,
      ref: 'Psychometric',
      required: true,
    },

    answers: [
      {
        questionId: Schema.Types.ObjectId,
        userAnswer: String,
        isCorrect: Boolean,
        timeTakenSec: Number,
      },
    ],

    score: Number,
    total: Number,
    accuracyPct: Number,
  },
  { timestamps: true },
);

const psychometricTest = model('psychometricTest', psychometricTestSchema);

export default psychometricTest;
