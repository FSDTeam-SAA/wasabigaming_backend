import { Types } from 'mongoose';

export interface IEvent {
  title?: string;
  description?: string;
  thamble?: string;
  date?: Date;
  status?: 'active' | 'inactive';
  createdBy?: Types.ObjectId;
}
