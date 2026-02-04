import { Types } from 'mongoose';

export interface IPremium {
  name: string;
  price: number;
  type?: 'monthly' | 'yearly'| 'weekly';
  features: string[];
  status: 'active' | 'inactive';
  totalSubscripeUser?: Types.ObjectId[];
  subscriptionCategory:string;
}
