import { Types } from 'mongoose';

export interface IAppliedJOb {
  userId: Types.ObjectId;
  cv?: string;
  jobId: Types.ObjectId;
  coverLetter?: string;
}
