import { Types } from 'mongoose';

export interface IWrittencasestudy {
  aiassigmentId?: Types.ObjectId;
  roleContext?: string;
  ventaraAutomotive?: string;
  yourManager?: string;
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
