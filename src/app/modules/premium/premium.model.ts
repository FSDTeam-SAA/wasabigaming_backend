import mongoose from 'mongoose';
import { IPremium } from './premium.interface';

const premiumSchema = new mongoose.Schema<IPremium>(
  {
    name: {
      type: String,
      enum: ['premium', 'free'],
    },
    price: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['monthly', 'yearly', 'weekly'],
    },
    features: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
    },
    totalSubscripeUser: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
    },
    subscriptionCategory: { type: String },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

const Premium = mongoose.model<IPremium>('Premium', premiumSchema);
export default Premium;
