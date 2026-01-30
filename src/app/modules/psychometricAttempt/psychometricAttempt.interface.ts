import { Types } from 'mongoose';

export interface IAnswer {
  questionId: Types.ObjectId;
  userAnswer?: string;
  isCorrect?: boolean;
  timeTakenSec?: number;
}

export interface IPsychometricAttempt  {
  user: Types.ObjectId;
  test: Types.ObjectId;
  answers: IAnswer[];
  score: number;
  totalTime?: number;
  keyStrength?: string;
  areaImprovements?: string;
  overallFeedback?: string;
}
