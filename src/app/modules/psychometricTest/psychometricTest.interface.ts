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
}
