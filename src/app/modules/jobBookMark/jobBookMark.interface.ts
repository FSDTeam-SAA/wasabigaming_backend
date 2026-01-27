import { Document, Types } from 'mongoose';

export interface IJobBookmark extends Document {
  user: Types.ObjectId; // reference to User
  job: Types.ObjectId;  // reference to Job
  createdAt: Date;
  updatedAt: Date;
}
