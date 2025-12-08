import { Types } from 'mongoose';

export interface IQuizzes {
  title?: string;
  course?: Types.ObjectId;
  numberQuestions?: number;
  duration?: number;
  status?: 'active' | 'draft';
  createBy?: Types.ObjectId;
  attempts?: Types.ObjectId[];
  questions?: string;
}
