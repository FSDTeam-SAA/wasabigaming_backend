// import { Schema, model } from 'mongoose';
// import { IPsychometricTest } from './psychometricTest.interface';

import mongoose from 'mongoose';
import { IPsychometricTest } from './psychometricTest.interface';

// const psychometricTestSchema = new Schema<IPsychometricTest>(
//   {
//     user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     test: {
//       type: Schema.Types.ObjectId,
//       ref: 'Psychometric',
//       required: true,
//     },

//     answers: [
//       {
//         questionId: Schema.Types.ObjectId,
//         userAnswer: String,
//         isCorrect: Boolean,
//         timeTakenSec: Number,
//       },
//     ],

//     score: Number,
//     total: Number,
//     accuracyPct: Number,
//   },
//   { timestamps: true },
// );

// const psychometricTest = model('psychometricTest', psychometricTestSchema);

// export default psychometricTest;

// ----------------- ai data ------------------
const psychometricTestSchema = new mongoose.Schema<IPsychometricTest>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Psychometric',
      required: true,
    },

    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        userAnswer: { type: String },
        isCorrect: { type: Boolean },
        timeTakenSec: { type: Number, default: 0 },
      },
    ],

    testScore: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 0 },
    accuracyPct: { type: Number, default: 0 },

    timeAnalysis: {
      avgTimeSec: Number,
      timePressureErrors: Number,
    },

    difficultyBreakdown: {
      easyQuestions: { type: Number, default: 0 },
      mediumQuestions: { type: Number, default: 0 },
      hardQuestions: { type: Number, default: 0 },
    },

    correctedAnswers: {
      totalCorrectedAnswers: { type: Number, default: 0 },
      easyCorrectedAnswers: { type: Number, default: 0 },
      mediumCorrectedAnswers: { type: Number, default: 0 },
      hardCorrectedAnswers: { type: Number, default: 0 },
    },
  },
  { timestamps: true },
);

const psychometricTest = mongoose.model<IPsychometricTest>(
  'psychometricTest',
  psychometricTestSchema,
);

export default psychometricTest;
