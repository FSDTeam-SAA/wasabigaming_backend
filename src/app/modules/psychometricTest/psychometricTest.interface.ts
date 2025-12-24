// import { Types } from 'mongoose';

// export interface IPsychometricTest {
//   user: Types.ObjectId;
//   test: Types.ObjectId;

//   answers: {
//     questionId: Types.ObjectId;
//     userAnswer: string;
//     isCorrect: boolean;
//     timeTakenSec: number;
//   }[];

//   score: number;
//   total: number;
//   accuracyPct: number;
// }

import { Types } from 'mongoose';

export interface IPsychometricTest {
  user: Types.ObjectId;
  test: Types.ObjectId;

  answers: {
    questionId: Types.ObjectId;
    userAnswer: string;
    isCorrect: boolean;
    timeTakenSec: number;
  }[];

  testScore: number;
  totalQuestions: number;
  accuracyPct: number;

  timeAnalysis?: {
    avgTimeSec?: number;
    timePressureErrors?: number;
  };

  difficultyBreakdown?: {
    easyQuestions: Number;
    mediumQuestions: Number;
    hardQuestions: Number;
  };
  correctedAnswers?: {
    easyCorrectedAnswers?: number;
    mediumCorrectedAnswers?: number;
    hardCorrectedAnswers?: number;
  };

  createdAt?: Date;
  updatedAt?: Date;
}
