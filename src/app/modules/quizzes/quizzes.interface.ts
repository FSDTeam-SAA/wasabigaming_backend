import { Types } from 'mongoose';

// export interface IQuizzes {
//   title?: string;
//   course?: Types.ObjectId;
//   numberQuestions?: number;
//   duration?: number;
//   status?: 'active' | 'draft';
//   createBy?: Types.ObjectId;
//   attempts?: Types.ObjectId[];
//   questions?: string;
// }

export interface IQuizzes {
  courseId: Types.ObjectId;
  videoId: Types.ObjectId;
  title: string;
  options: string[];
  answer: string;
  userAnswer: string;
  score: number;
  isCorrect: boolean;
  status: 'active' | 'draft';
  userId?: Types.ObjectId[];
}
