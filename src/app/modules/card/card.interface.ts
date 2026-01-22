import { Types } from 'mongoose';

export interface ICard {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  createdBy: Types.ObjectId;
  status: 'active' | 'inactive';
}
