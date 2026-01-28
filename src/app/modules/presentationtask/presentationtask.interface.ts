import { Types } from 'mongoose';

export interface IPresentationTask {
  aiassigmentId?: Types.ObjectId;
  ventaraMobility?: string;
  keyObject?: string[];
  proTip?: string[];
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
