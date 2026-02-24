import { Types } from 'mongoose';

export interface ICv {
  applicationId: Types.ObjectId;
  studentId: Types.ObjectId;
  cvUrl: string;
}
