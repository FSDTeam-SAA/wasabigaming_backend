import { Types } from 'mongoose';

export interface IPremium {
  name: string;
  price: number;
  type?: 'mounth' | 'year';
  features: string[];
  status: 'active' | 'inactive';
  totalSubscripeUser?: Types.ObjectId[];
}
