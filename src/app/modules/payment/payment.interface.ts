import { Types } from 'mongoose';

export interface IPayment {
  user: Types.ObjectId;
  subscription?: Types.ObjectId;
  course?:Types.ObjectId;
  stripeSessionId: string;
  stripePaymentIntentId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
}
