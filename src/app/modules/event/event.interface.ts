import { Types } from 'mongoose';

export interface IEvent {
  title?: string;
  subTitle?: string;
  content?: string;
  description?: string;
  thamble?: string;
  date?: Date;
  time?: string;
  status?: 'active' | 'inactive';
  createdBy?: Types.ObjectId;
}
