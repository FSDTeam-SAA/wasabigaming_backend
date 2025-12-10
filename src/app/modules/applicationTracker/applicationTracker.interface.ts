import { Types } from 'mongoose';

export interface IApplicationTracker {
  schoolName: Types.ObjectId;
  applicationType?: string;
  description?: string;
  status?: 'approved' | 'pending' | 'in review' | 'rejected';
  createBy?: Types.ObjectId;
}
