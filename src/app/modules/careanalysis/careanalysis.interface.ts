import { Types } from 'mongoose';

export interface ICareanalysis {
  aiassigmentId?: Types.ObjectId;
  precedentSummary?: string;
  pretendCase?: string;
  yourResponse?: string;
  legalIssue?: string;
  caseLinking?: string;
  summaryQuality?: string;
  applicant?: Types.ObjectId;
}
