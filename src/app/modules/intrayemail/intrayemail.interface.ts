import { Types } from 'mongoose';

export interface IIntrayemail {
  aiassigmentId?: Types.ObjectId;
  discribtion?: string;
  question?: string;
  yourResponse?: string;
  feedback?: string;
  totalScore?: number;
  wordsCompleted?: number;
  completionRate?: number;
  writingSpeed?: number;
  overallGrade?: string;
  successTips?: string[];
  recommendations?: string[];

  applicant?: Types.ObjectId;
}
