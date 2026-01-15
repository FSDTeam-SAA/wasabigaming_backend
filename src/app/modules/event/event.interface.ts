import { Types } from 'mongoose';

export interface IEvent {
  title?: string;
  subTitle?: string;
  content?: string;
  description?: string;
  thumbnail?: string;
  eventType?: string;
  date?: Date;
  time?: string;
  status?: 'active' | 'inactive';
  createdBy?: Types.ObjectId;
}
