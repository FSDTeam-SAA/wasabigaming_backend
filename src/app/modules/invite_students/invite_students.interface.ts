import { Types } from 'mongoose';

export interface IInviteStudent {
  name: string;
  email: string;
  message: string;
  url?: string;
  createBy?: Types.ObjectId;
}
