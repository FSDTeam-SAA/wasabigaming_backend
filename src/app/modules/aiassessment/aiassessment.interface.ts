import { Types } from 'mongoose';

export interface IAiassessment {
  logo?: string;
  title?: string;
  discription?: string;
  duration?: number;
  status: 'PENDING' | 'AVAILABLE' | 'COMPLETED';
  applicationUser?: Types.ObjectId[];
  type?: string;
}
