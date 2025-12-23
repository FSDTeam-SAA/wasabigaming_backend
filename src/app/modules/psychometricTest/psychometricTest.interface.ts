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

  score: number;
  total: number;
  accuracyPct: number;

  timeAnalysis?: {
    avgTimeSec?: number;
    timePressureErrors?: number;
  };

  difficultyBreakdown?: {
    easy?: number;
    medium?: number;
    hard?: number;
  };

  createdAt?: Date;
  updatedAt?: Date;
}
